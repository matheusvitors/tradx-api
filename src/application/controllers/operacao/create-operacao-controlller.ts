import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { updateSaldo } from "@/application/usecases/operacao";
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

		if(ativo.dataVencimento && (input.dataEntrada > ativo.dataVencimento)) {
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
			margem: 0,
			operacaoPerdida: input.operacaoPerdida,
			operacaoErrada: input.operacaoErrada,
		};

		validateOperacao(operacao);
		const createdOperacao = await operacaoRepository.create(operacao);

		updateSaldo({
			operacao,
			conta,
			contaRepository,
			ativo
		})

		// if(operacao.precoSaida){
		// 	const saldo = calculateSaldo({
		// 		tipo: operacao.tipo === 'compra' ? 'compra' : 'venda',
		// 		previousSaldo: conta.saldo,
		// 		precoEntrada: operacao.precoEntrada,
		// 		precoSaida: operacao.precoSaida,
		// 		multiplicador: ativo.multiplicador
		// 	})
		// 	await contaRepository.edit({...conta, saldo})
		// }
		return success(createdOperacao);

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}

}
