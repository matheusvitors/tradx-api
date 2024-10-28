import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository } from "@/application/interfaces";
import { processCsv } from "@/application/usecases/process-csv";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { unprocessableEntity, serverError, notFound, success } from "@/infra/adapters/response-wrapper";

interface ImportOperacoesByCsvParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	csvFile: string;
}

export const importOperacoesByCsv = async (params: ImportOperacoesByCsvParams) => {
	try {
		const { operacaoRepository, ativoRepository, contaRepository, csvFile } = params;

		const processImportedCsv = async (input: any) => {
			if(
				'ativoId' in input &&
				'contaId' in input &&
				'dataVencimento' in input &&
				'dataEntrada' in input
			) {
				const ativo = await ativoRepository.get(input.ativoId);

				if(!ativo) {
					return notFound('Ativo não encontrado.');
				}

				const conta = await contaRepository.get(input.contaId);

				if(!conta) {
					return notFound('Conta não encontrada.');
				}

				if(ativo.dataVencimento && (input.dataEntrada > ativo.dataVencimento)) {
					return unprocessableEntity('Data e horário de entrada fora da validade do ativo.')
				}
			}

			const operacao: OperacaoDTO = {
				id: newID(),
				ativoId: input.ativoId,
				contaId: input.contaId,
				quantidade: input.quantidade,
				tipo: input.tipo,
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

		}

		// processamento do arquivo
		const isProcessedFile = await processCsv(csvFile, processImportedCsv);

		return isProcessedFile ? success() : unprocessableEntity('Arquivo não foi processado devido a um erro desconhecido');
	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
