import { AtivoType } from "@/core/models";

export interface AtivoDTO {
	id?: string;
	nome: string;
	acronimo: string;
	multiplicador: number;
	tipo: AtivoType;
	dataVencimento?: string;
}
