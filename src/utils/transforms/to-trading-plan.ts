import { TradingPlan } from "@/core/models";
import { toUsuario } from "@/utils/transforms";

export const toTradingPlan = (input: any): TradingPlan => {
	return {
		id: input.id,
		usuario: toUsuario(input.usuario),
		nome: input.nome
	}
}
