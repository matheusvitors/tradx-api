import { createReadStream, existsSync } from "fs";
import { OperacaoDTO } from "@/application/dto";
import { Repository, ResponseData } from "@/application/interfaces";
import { validateOperacoesCsv } from "@/application/usecases/operacao";
import { operacaoCsvValidator } from "@/application/validators";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { csv } from "@/infra/adapters/csv";
import { newID } from "@/infra/adapters/newID";
import { unprocessableEntity, serverError, notFound, success } from "@/infra/adapters/response-wrapper";
import { database } from "@/infra/database/database";
import { toValidDate } from "@/utils/to-valid-date";

interface importOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	csvFile: string;
}

//TODO: Fazer o rollback caso haja algum erro de ativo ou conta invalida

export const importOperacoesByCsvController = async (params: importOperacoesByCsvControllerParams): Promise<ResponseData> => {
	const { operacaoRepository, ativoRepository, contaRepository, csvFile } = params;
	try {
		const operacoesToSave: OperacaoDTO[] = [];
		const isValid = await validateOperacoesCsv(csvFile);

		if(!existsSync(csvFile)) {
			return notFound('Arquivo não encontrado no servidor.');
		}

		if(!isValid){
			return unprocessableEntity('Há informações inválidas no arquivo.')
		}

		const processRow = async (row: any, reject: (value: unknown) => void) => {
			try {
				const ativo = await ativoRepository.find!('acronimo', row.ativo);

				if(!ativo) {
					reject(unprocessableEntity('Ativo não encontrado.'));
					return;
				}

				const conta = await contaRepository.find!('nome', row.conta);

				if(!conta) {
					reject(unprocessableEntity('Conta não encontrada.'));
					return;
				}

				const operacao: OperacaoDTO = {
					id: newID(),
					ativoId: ativo.id,
					contaId: conta.id,
					quantidade: parseInt(row.quantidade),
					tipo: row.tipo.toLowerCase(),
					precoEntrada: parseFloat(row.precoEntrada),
					stopLoss: parseFloat(row.stopLoss),
					alvo: parseFloat(row.alvo),
					precoSaida: parseFloat(row.precoSaida),
					dataEntrada: toValidDate(row.dataEntrada),
					dataSaida: row.dataSaida ? toValidDate(row.dataSaida) : undefined,
					margem: 0,
					operacaoPerdida: row.operacaoPerdida === 'false' ? false : true,
					operacaoErrada: row.operacaoErrada === 'false' ? false : true,
					comentarios: row.comentarios,
					motivo: row.motivo
				};

				validateOperacao(operacao);
				operacoesToSave.push(operacao);
			} catch (error) {
				reject(error)
			}
		}

		const promises: Promise<void>[] = [];

		const result = await new Promise((resolve, reject) => {
			createReadStream(csvFile)
			.pipe(csv.parse())
			.on('data', row => promises.push(processRow(row, reject)))
			.on('error', async (error) => {
				console.error('process csv error',error);
				reject(error)
			})
			.on('end', async () => {
				await Promise.all(promises);
				resolve(true);
			});
		})

		await operacaoRepository.batchCreation!(operacoesToSave);
		return success();
	} catch (error: any) {
		operacaoRepository.rollback && operacaoRepository.rollback();
		if(typeof error === 'object' && 'status' in error) {
			return error;
		} else {
			return serverError(error);
		}
	}
}
