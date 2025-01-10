import { createReadStream, existsSync, unlinkSync } from "fs";
import { OperacaoDTO } from "@/application/dto";
import { Repository, ResponseData } from "@/application/interfaces";
import { validateOperacoesCsv } from "@/application/usecases/operacao";
import { Ativo, Conta, Operacao } from "@/core/models";
import { csv } from "@/infra/adapters/csv";
import { unprocessableEntity, serverError, notFound, success } from "@/infra/adapters/response-wrapper";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { toValidDate } from "@/utils/to-valid-date";
import { NODE_ENV } from "@/infra/config/environment";
import { ValidationError } from "@/application/errors";

interface importOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	file: string;
}

//TODO: Fazer o rollback caso haja algum erro de ativo ou conta invalida

export const importOperacoesByCsvController = async (params: importOperacoesByCsvControllerParams): Promise<ResponseData> => {
	const { operacaoRepository, ativoRepository, contaRepository, file } = params;
	try {
		const operacoesToSave: OperacaoDTO[] = [];

		if(!existsSync(file)) {
			return notFound('Arquivo não encontrado no servidor.');
		}

		const contas = await contaRepository.list();
		const ativos = await ativoRepository.list();


		const processRow = async (row: any, reject: (value: unknown) => void) => {
			try {
				console.log(row.ativo);

				const ativo = ativos.find(ativo => ativo.acronimo === row['Ativo'])

				if(!ativo) {
					reject(unprocessableEntity('Ativo não encontrado.'));
					return;
				}

				const conta = contas.find(conta => conta.nome === row['Conta'])

				if(!conta) {
					reject(unprocessableEntity('Conta não encontrada.'));
					return;
				}

				const splitDate = row['Data'].split('/');
				const splitHoraEntrada = row['Horario - Entrada'].split(':')
				const splitHoraSaida = row['Horario - Saída'].split(':')
				const horarioEntrada = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitHoraEntrada[0]}:${splitHoraEntrada[1]}`
				const horarioSaida = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitHoraSaida[0]}:${splitHoraSaida[1]}`


				const operacao: OperacaoDTO = {
					// id: newID(),
					// ativoId: ativo.id,
					// contaId: conta.id,
					// quantidade: parseInt(row.quantidade),
					// tipo: row.tipo.toLowerCase(),
					// precoEntrada: parseFloat(row.precoEntrada),
					// stopLoss: parseFloat(row.stopLoss),
					// alvo: parseFloat(row.alvo),
					// precoSaida: parseFloat(row.precoSaida),
					// dataEntrada: toValidDate(row.dataEntrada),
					// dataSaida: row.dataSaida ? toValidDate(row.dataSaida) : undefined,
					// margem: 0,
					// operacaoPerdida: row.operacaoPerdida === 'false' ? false : true,
					// operacaoErrada: row.operacaoErrada === 'false' ? false : true,
					// comentarios: row.comentarios,
					// motivo: row.motivo
					id: newID(),
					ativoId: ativo.id,
					contaId: conta.id,
					quantidade: parseInt(row['Contratos']),
					tipo: row['Tipo'] === 'Compra' ? 'compra' : 'venda',
					precoEntrada: parseInt(row['Entrada']),
					stopLoss: parseInt(row['Stop Loss']),
					alvo: parseInt(row['Alvo']),
					precoSaida: parseInt(row['Saída']),
					dataEntrada: new Date(horarioEntrada),
					dataSaida: new Date(horarioSaida),
					operacaoPerdida: row['Operação Perdida?'] === 'TRUE'? true : false,
					operacaoErrada: row['Erro?'] === 'TRUE'? true : false,
					comentarios: row['Comentário'] ?? ''

				};

				validateOperacao(operacao);
				operacoesToSave.push(operacao);
			} catch (error) {
				reject(error)
			}
		}

		const promises: Promise<void>[] = [];

		await new Promise((resolve, reject) => {
			createReadStream(file)
			.pipe(csv.parse())
			// .on('data', row => promises.push(new Promise(async (resolve) => {
			// 	const operacao = await processCsv({row, reject, ativoRepository, contaRepository});
			// 	operacao && operacoesToSave.push(operacao)
			// 	resolve();
			// 	})
			// ))
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
		NODE_ENV !== "test" && unlinkSync(file);

		return success();
	} catch (error: any) {
		operacaoRepository.rollback && operacaoRepository.rollback();
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		if("status" in error) {
			return error;
		}

		return serverError(error);

	}
}
