import { Conta } from "@/core/models";

export const toConta = (input: any): Conta => {
	return {
		id: input.id,
		nome: input.nome,
		tipo: input.tipo === 'real' ? 'real' : 'simulador',
		usuario: input.usuario,
		saldo: input.saldo / 100,
		saldoInicial: input.saldoInicial / 100,
		usuarioId: input.usuarioId
	}

}
