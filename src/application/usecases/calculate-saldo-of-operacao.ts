import { Operacao } from "@/core/models"

export const calculateSaldoOfOperacao = (operacao: Operacao): number => {
	if(!operacao.precoSaida) {
		return 0;
	}

	const { tipo, precoEntrada, precoSaida } = operacao;
	const { multiplicador } = operacao.ativo;

	let saldo: number = tipo === 'compra' ? precoSaida - precoEntrada : precoEntrada - precoSaida;
	saldo = saldo * multiplicador;

	return saldo;
}
