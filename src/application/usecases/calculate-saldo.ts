import { OperacaoType } from "@/core/models";

interface CalculateSaldoParams {
	tipo: OperacaoType;
	previousSaldo: number;
	precoEntrada: number;
	precoSaida: number;
	multiplicador: number;
}

export const calculateSaldo = ({ tipo, previousSaldo, precoEntrada, precoSaida, multiplicador}: CalculateSaldoParams): number => {
	let result = tipo === 'compra' ? precoSaida - precoEntrada : precoEntrada - precoSaida;
	result = result * multiplicador;

	return result + previousSaldo;
}
