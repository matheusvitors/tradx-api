import { OperacaoDTO } from "@/application/dto";
import { Repository } from "@/application/interfaces";
import { calculateSaldo } from "@/application/usecases";
import { Ativo, Conta } from "@/core/models";

interface UpdateSaldoParams {
	operacao: OperacaoDTO;
	conta: Conta;
	ativo: Ativo
	contaRepository: Repository<Conta>;
}

export const updateSaldo = async ({operacao, ativo, conta, contaRepository}: UpdateSaldoParams) => {
	if(operacao.precoSaida){
		const saldo = calculateSaldo({
			tipo: operacao.tipo === "compra" ? "compra" : "venda",
			previousSaldo: conta.saldo,
			precoEntrada: operacao.precoEntrada,
			precoSaida: operacao.precoSaida,
			multiplicador: ativo.multiplicador,
		});
		await contaRepository.edit({ ...conta, saldo });
	}
};
