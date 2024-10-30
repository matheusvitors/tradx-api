import { OperacaoDTO } from "@/application/dto";
import { Repository } from "@/application/interfaces";
import { processCsv } from "@/application/usecases/process-csv";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { unprocessableEntity, serverError, notFound, success } from "@/infra/adapters/response-wrapper";
import { ReadStream } from "fs";
import { z } from "zod";

interface importOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	csvFile: string;
}

const operacaoFromCsvSchema = z.object({
	conta: z.string().min(2),
	ativo: z.string().min(2),
	quantidade: z.string().min(1),
	tipo: z.string().min(4),
	precoEntrada: z.string().min(2),
	precoSaida: z.string().min(2),
	dataEntrada: z.string().min(2),
	dataSaida: z.string().min(2),
	operacaoPerdida: z.string().min(2),
	operacaoErrada: z.string().min(2),
})

export const importOperacoesByCsvController = async (params: importOperacoesByCsvControllerParams) => {
	try {
		const { operacaoRepository, ativoRepository, contaRepository, csvFile } = params;

		const validateInformationsOfCsv = async (row: any, stream: ReadStream): Promise<boolean> => {
			const validation = operacaoFromCsvSchema.safeParse(row);
			console.log('validation', JSON.stringify(validation));

			if (!validation.success) {
				stream.emit('error', new Error('Formato inválido.'))
				return false;
			}

			return true;
		}

		const processImportedCsv = async (input: any) => {
			try {
				if(
					'ativo' in input &&
					'conta' in input &&
					'dataVencimento' in input &&
					'dataEntrada' in input
				) {
					const ativo = await ativoRepository.find!('acronimo', input.ativo);

					if(!ativo) {
						throw notFound('Ativo inexistente.');
					}

					const conta = await contaRepository.find!('nome', input.conta);

					if(!conta) {
						throw notFound('Conta não encontrada.');
					}

				}

				const operacao: OperacaoDTO = {
					id: newID(),
					ativoId: input.ativo.id,
					contaId: input.conta.id,
					quantidade: input.quantidade,
					tipo: input.tipo.toLowerCase(),
					precoEntrada: input.precoEntrada,
					stopLoss: input.stopLoss,
					alvo: input.alvo,
					precoSaida: input.precoSaida,
					dataEntrada: new Date(input.dataEntrada),
					dataSaida: input.dataSaida ? new Date(input.dataSaida) : undefined,
					margem: 0,
					operacaoPerdida: input.operacaoPerdida,
					operacaoErrada: input.operacaoErrada,
					comentarios: input.comentarios,
					motivo: input.motivo
				};

				validateOperacao(operacao);
				console.log(operacao);
			} catch (error) {
				console.error(error)
				throw serverError(error)
			}


		}

		// processamento do arquivo
		const isValid = await processCsv(csvFile, validateInformationsOfCsv);
		console.log('isValid', isValid);

		// if(!isValid) {
		// 	return unprocessableEntity('Formato inválido.')
		// }


			// const isProcessedFile = await processCsv(csvFile, processImportedCsv);
			// const isProcessedFile = await processCsv(csvFile, async (row) => console.log(row));
		// return isProcessedFile ? success() : unprocessableEntity('Arquivo não foi processado devido a um erro desconhecido');
		return success();
	} catch (error: any) {
		console.log('imported', error)
		if('status' in error) {
			return error;
		} else {
			return serverError(error);
		}
	}
}
