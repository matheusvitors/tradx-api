export interface OperacaoDTO {
	id: string;
	ativoId: string;
	contaId: string;
	regraEntradaId: string;
	quantidade: number;
	tipo: string;
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
