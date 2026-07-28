import { Operacao } from "@/core/models"
import { toAtivo, toConta, toRegraEntrada } from "@/utils/transforms"

export const toOperacao = (input: any): Operacao => {
	return {
		id: input.id,
		ativo: input.ativoId,
		conta:  input.contaId,
		regraEntrada:  input.regraEntradaId,
		// ativo: toAtivo(input.ativo),
		// conta: toConta(input.conta),
		// regraEntrada: toRegraEntrada(input.regraEntrada),
		quantidade: input.quantidade,
		tipo: input.tipo === 'compra' ? 'compra' : 'venda',
		precoEntrada: input.precoEntrada,
		stopLoss: input.stopLoss,
		alvo: input.alvo,
		precoSaida: input.precoSaida,
		dataEntrada: input.dataEntrada,
		dataSaida: input.dataSaida,
		operacaoPerdida: input.operacaoPerdida,
		operacaoErrada: input.operacaoErrada,
		comentarios: input.comentarios || undefined
	}
}
