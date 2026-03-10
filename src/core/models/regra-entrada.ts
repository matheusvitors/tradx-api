import { TradingPlan } from "@/core/models";
import { Operacao } from "@/core/models/operacao";

export interface RegraEntrada {
	id: string;
	tradingPlan: TradingPlan;
	tradingPlanId?: string;
	nome: string;

	operacoes?: Operacao[];
}
