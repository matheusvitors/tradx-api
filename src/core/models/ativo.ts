export interface Ativo {
    id: number;
    publicId: string;
	nome: string;
	acronimo: string;
	multiplicador: number;
	tipo: AtivoType;
	dataVencimento?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export const ativoTypes = ['indice', 'acao'] as const;
export type AtivoType = (typeof ativoTypes)[number];
