export interface Ativo {
    id: string;
	nome: string;
	acronimo: string;
	multiplicador: number;
	tipo: AtivoType;
	dataVencimento?: Date;
}

export const ativoTypes = ['indice', 'acao'] as const;
export type AtivoType = (typeof ativoTypes)[number];
