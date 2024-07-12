import { Usuario } from "@/core/models";

export interface Conta {
    id: number;
    publicId: string;
	nome: string;
	tipo: ContaType;
	usuario: Usuario;
	saldo: number;
	saldoInicial: number;
	createdAt: Date;
	updatedAt: Date;
}

export const contaTypes = ['real', 'simulador'] as const;
type ContaType = (typeof contaTypes)[number];
