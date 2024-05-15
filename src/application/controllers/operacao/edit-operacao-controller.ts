import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { calculateSaldo } from "@/application/usecases/calculate-saldo";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { notFound, success, unprocessableEntity, serverError } from "@/infra/adapters/response-wrapper";

interface EditOperacaoControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	input: OperacaoDTO;
}

export const editOperacaoController = async (params: EditOperacaoControllerParams): Promise<ResponseData> => {
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

		validateOperacao(input);

		const operacao = await operacaoRepository.get(input.id);

		if(!operacao) {
			return notFound();
		}

		const editedOperacao = await operacaoRepository.edit(input);

		if(editedOperacao && editedOperacao.precoSaida){
			const saldo = calculateSaldo({
				tipo: editedOperacao.tipo === 'compra' ? 'compra' : 'venda',
				previousSaldo: conta.saldo,
				precoEntrada: editedOperacao.precoEntrada,
				precoSaida: editedOperacao.precoSaida,
				multiplicador: ativo.multiplicador
			})

			await contaRepository.edit({...conta, saldo})
		}

		return success({ operacao: editedOperacao});

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
