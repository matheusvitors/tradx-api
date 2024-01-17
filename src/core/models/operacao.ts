import { Ativo } from "@/core/models/ativo";

export interface Operacao {
	id: string;
	ativo: Ativo;
	quantidade: number;
	tipo: 'compra' | 'venda';
	precoEntrada: number;
	stopLoss: number;
	alvo: number;
	precoSaida: number;
	dataEntrada: Date;
	dataSaida: Date;
	margem: number;
	operacaoPerdida: boolean;
	operacaoErrada: boolean;
	motivo?: string;
	comentarios?: string;
}
