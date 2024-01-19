import { Ativo } from "@/core/models"

export const toAtivo = (input: any): Ativo => {
	return {
		id: input.id && input.id,
		nome: input.nome && input.nome,
		acronimo: input.acronimo && input.acronimo,
		tipo: input.tipo && input.tipo === 'acao' ? 'acao' : 'indice'
	}
}
