import { Usuario } from "@/core/models";

export const toUsuario = (input: any): Usuario => {
	return {
		id: input.id,
		nome: input.nome,
		username: input.username,
		password: input.password,
		email: input.email
	}
}
