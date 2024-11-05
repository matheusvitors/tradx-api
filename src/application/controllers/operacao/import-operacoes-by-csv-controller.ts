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

interface importOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	csvFile: string;
}

//TODO: Fazer o rollback caso haja algum erro de ativo ou conta invalida

export const importOperacoesByCsvController = async (params: importOperacoesByCsvControllerParams): Promise<ResponseData> => {
	try {
		const { operacaoRepository, ativoRepository, contaRepository, csvFile } = params;

		const isValid = await validateOperacoesCsv(csvFile);

		if(!existsSync(csvFile)) {
			return notFound('Arquivo não encontrado no servidor.');
		}


		if(!isValid){
			return unprocessableEntity('Há informações inválidas no arquivo.')
		}

		await new Promise((resolve, reject) => {
			createReadStream(csvFile)
			.pipe(csv.parse())
			.on('data', async (row) => {
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
						quantidade: row.quantidade,
						tipo: row.tipo.toLowerCase(),
						precoEntrada: row.precoEntrada,
						stopLoss: row.stopLoss,
						alvo: row.alvo,
						precoSaida: row.precoSaida,
						dataEntrada: new Date(row.dataEntrada),
						dataSaida: row.dataSaida ? new Date(row.dataSaida) : undefined,
						margem: 0,
						operacaoPerdida: row.operacaoPerdida,
						operacaoErrada: row.operacaoErrada,
						comentarios: row.comentarios,
						motivo: row.motivo
					};

					validateOperacao(operacao);
					// console.log(operacao);
					await operacaoRepository.create(operacao);
				} catch (error) {
					reject(error)
				}

			})
			.on('error', async (error) => {
				console.error('process csv error',error);
				reject(error)
			})
			.on('end', async () => {
				resolve(true);
			});
		})

		return success();
	} catch (error: any) {
		if(typeof error === 'object' && 'status' in error) {
			return error;
		} else {
			return serverError(error);
		}
	}
}
