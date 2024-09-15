export interface Ativo {
    id: string;
	nome: string;
	acronimo: string;
	multiplicador: number;
	tipo: AtivoType;
	dataVencimento?: string;
}

export const ativoTypes = ['indice', 'acao'] as const;
export type AtivoType = (typeof ativoTypes)[number];
