import { OperacaoDTO } from "@/application/dto";
import { Repository } from "@/application/interfaces";
import { calculateSaldo } from "@/application/usecases";
import { Ativo, Conta } from "@/core/models";

interface UpdateSaldoParams {
	operacao: OperacaoDTO;
	conta: Conta;
	ativo: Ativo
	contaRepository: Repository<Conta>;
	isRemoving?: boolean;
}

export const updateSaldo = async ({operacao, ativo, conta, contaRepository, isRemoving}: UpdateSaldoParams) => {
	if(operacao.precoSaida){
		let saldo = calculateSaldo({
			tipo: operacao.tipo === "compra" ? "compra" : "venda",
			previousSaldo: conta.saldo,
			precoEntrada: operacao.precoEntrada,
			precoSaida: operacao.precoSaida,
			multiplicador: ativo.multiplicador,
		});

		if (isRemoving) {
			saldo  = saldo - conta.saldo;
			saldo = conta.saldo - saldo;
		}

		await contaRepository.edit({ ...conta, saldo });
	}
};
