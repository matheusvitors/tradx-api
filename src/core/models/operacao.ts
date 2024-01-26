import { Ativo, Conta } from "@/core/models";

export interface Operacao {
	id: string;
	ativo: Ativo;
	conta: Conta;
	quantidade: number;
	tipo: OperacaoType;
	precoEntrada: number;
	stopLoss: number;
	alvo: number;
	precoSaida?: number;
	dataEntrada: Date;
	dataSaida?: Date;
	margem: number;
	operacaoPerdida: boolean;
	operacaoErrada: boolean;
	motivo?: string;
	comentarios?: string;
}

export const operacaoTypes = ['compra', 'venda'] as const;
type OperacaoType = (typeof operacaoTypes)[number];

