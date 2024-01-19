import { Operacao } from "@/core/models"
import { toAtivo } from "@/utils/transforms"

export const toOperacao = (input: any): Operacao => {
	return {
		id: input.id,
		ativo: toAtivo(input.ativo),
		quantidade: input.quantidade,
		tipo: input.tipo === 'compra' ? 'compra' : 'venda',
		precoEntrada: input.precoEntrada,
		stopLoss: input.stopLoss,
		alvo: input.alvo,
		precoSaida: input.precoSaida,
		dataEntrada: input.dataEntrada,
		dataSaida: input.dataSaida,
		margem: input.alvo,
		operacaoPerdida: input.operacaoPerdida,
		operacaoErrada: input.operacaoErrada,
		motivo: input.motivo || undefined,
		comentarios: input.comentarios || undefined
	}
}
