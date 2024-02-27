import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { success, unprocessableEntity, serverError, notFound } from "@/infra/adapters/response-wrapper";

interface CreateOperacaoControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	input: Omit<OperacaoDTO, 'id'>;
}

export const createOperacaoController = async (params: CreateOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const { operacaoRepository , ativoRepository, contaRepository, input } = params;

		const ativo = await ativoRepository.get(input.ativoId);

		if(!ativo) {
			return notFound('Ativo não encontrado.');
		}

		const conta = await contaRepository.get(input.contaId);

		if(!conta) {
			return notFound('Conta não encontrada.');
		}

		console.log(input.dataEntrada, ativo.dataVencimento);

		//verificar se a data de entrada está dentro da expiração do ativo
		if(ativo.dataVencimento && (input.dataEntrada > ativo.dataVencimento)) {
			return unprocessableEntity('Data e horário de entrada fora da validade do ativo.')
		}

		//verificar se a data de saida está após a data de entrada
		if(input.dataSaida && (input.dataEntrada < input.dataSaida)) {
			return unprocessableEntity('Data e horário de entrada fora da validade do ativo.')
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
			margem: input.margem,
			operacaoPerdida: input.operacaoPerdida,
			operacaoErrada: input.operacaoErrada,
		};

		validateOperacao(operacao);

		const createdOperacao = await operacaoRepository.create(operacao);
		return success(createdOperacao);

	} catch (error) {
		console.log(error)
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}

}
