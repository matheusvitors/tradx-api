import { OperacaoType } from "@/core/models";

interface CalculateSaldoParams {
	tipo: OperacaoType;
	precoEntrada: number;
	precoSaida: number;
	multiplicador: number;
}

export const calculateSaldo = ({ tipo, precoEntrada, precoSaida, multiplicador}: CalculateSaldoParams): number => {
	let saldo = 0;
	if(precoSaida) {
		saldo = tipo === 'compra' ? precoSaida - precoEntrada : precoSaida - precoEntrada;
		saldo = saldo * multiplicador;
	}
	return saldo;
}
