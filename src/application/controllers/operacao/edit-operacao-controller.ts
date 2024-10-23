import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { calculateSaldo } from "@/application/usecases/calculate-saldo";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { notFound, success, unprocessableEntity, serverError } from "@/infra/adapters/response-wrapper";
import { format } from "date-fns";

interface EditOperacaoControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	input: OperacaoDTO;
}

export const editOperacaoController = async (params: EditOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const { operacaoRepository , ativoRepository, contaRepository, input } = params;
		console.log(input);


		const ativo = await ativoRepository.get(input.ativoId);
		console.log(ativo);


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

		const editedOperacao = await operacaoRepository.edit({
			...input, dataEntrada: new Date(input.dataEntrada),
			dataSaida: input.dataSaida ? new Date(input.dataSaida) : undefined
		});

		if(editedOperacao && editedOperacao.precoSaida){
			const saldo = calculateSaldo({
				tipo: editedOperacao.tipo === 'compra' ? 'compra' : 'venda',
				previousSaldo: typeof conta.saldo !== 'number' ? parseFloat(conta.saldo) : conta.saldo,
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
