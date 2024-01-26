import { Usuario } from "@prisma/client";

export interface Conta {
	id: string;
	nome: string;
	tipo: ContaType;
	usuario: Usuario;
}

export const contaTypes = ['real', 'simulador'] as const;
type ContaType = (typeof contaTypes)[number];