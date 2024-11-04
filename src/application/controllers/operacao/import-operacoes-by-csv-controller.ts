import { OperacaoDTO } from "@/application/dto";
import { Repository, ResponseData } from "@/application/interfaces";
import { validateOperacoesCsv } from "@/application/usecases/operacao";
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


export const importOperacoesByCsvController = async (params: importOperacoesByCsvControllerParams): Promise<ResponseData> => {
	try {
		const { operacaoRepository, ativoRepository, contaRepository, csvFile } = params;

		const isValid = await validateOperacoesCsv(csvFile);

		if(!isValid){
			return unprocessableEntity('Há informações inválidas nop arquivo.')
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
