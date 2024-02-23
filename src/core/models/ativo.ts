export interface Ativo {
	id: string;
	nome: string;
	acronimo: string;
	tipo: AtivoType;
	dataVencimento?: Date;
}

export const ativoTypes = ['indice', 'acao'] as const;
type AtivoType = (typeof ativoTypes)[number];
