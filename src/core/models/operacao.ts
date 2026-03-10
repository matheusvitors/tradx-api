import { Ativo, Conta, RegraEntrada } from "@/core/models";

export interface Operacao {
	id: string;
	ativoId?: string;
	ativo: Ativo;
	contaId?: string;
	conta: Conta;
	regraEntradaId?: string;
	regraEntrada: RegraEntrada;
	quantidade: number;
	tipo: OperacaoType;
	precoEntrada: number;
	stopLoss: number;
	alvo: number;
	precoSaida?: number;
	dataEntrada: Date;
	dataSaida?: Date;
	operacaoPerdida: boolean;
	operacaoErrada: boolean;
	comentarios?: string;
}

export const operacaoTypes = ['compra', 'venda'] as const;
export type OperacaoType = (typeof operacaoTypes)[number];

