import { AtivoType } from "@/core/models";

export interface AtivoDTO {
	id?: number;
    publicId: string;
	nome: string;
	acronimo: string;
	multiplicador: number;
	tipo: AtivoType;
	dataVencimento?: Date;
}
