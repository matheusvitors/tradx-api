export interface OperacaoDTO {
	id: string;
	ativoId: string;
	contaId: string;
	quantidade: number;
	tipo: string;
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
