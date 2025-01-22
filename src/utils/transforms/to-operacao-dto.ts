import { OperacaoDTO } from "@/application/dto";
import { Operacao } from "@/core/models";

export const toOperacaoDto = (operacao: Operacao): OperacaoDTO => {
	return {
		id: operacao.id,
		ativoId: operacao.ativo.id,
		contaId: operacao.conta.id,
		quantidade: operacao.quantidade,
		tipo: operacao.tipo,
		precoEntrada: operacao.precoEntrada,
		stopLoss: operacao.stopLoss,
		alvo: operacao.alvo,
		precoSaida: operacao.precoSaida,
		dataEntrada: operacao.dataEntrada,
		dataSaida: operacao.dataSaida,
		margem: operacao.margem,
		operacaoPerdida: operacao.operacaoPerdida,
		operacaoErrada: operacao.operacaoErrada,
		comentarios: operacao.comentarios,
	}
}
