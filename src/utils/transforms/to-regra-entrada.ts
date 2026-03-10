import { RegraEntrada } from "@/core/models";
import { toTradingPlan } from "@/utils/transforms";

export const toRegraEntrada = (input: any): RegraEntrada => {
	return {
		id: input.id,
		tradingPlan: toTradingPlan(input.tradingPlan),
		nome: input.nome
	}
}
