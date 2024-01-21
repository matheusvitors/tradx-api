import { Ativo } from "@/core/models"

export const toAtivo = (input: any): Ativo => {
	console.log({
		id: input.id,
		nome: input.nome,
		acronimo: input.acronimo,
		tipo: input.tipo === 'acao' ? 'acao' : 'indice'
	});

	return {
		id: input.id,
		nome: input.nome,
		acronimo: input.acronimo,
		tipo: input.tipo === 'acao' ? 'acao' : 'indice'
	}
}
