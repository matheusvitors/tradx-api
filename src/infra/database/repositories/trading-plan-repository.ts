import { eq, SQL, and } from "drizzle-orm";
import { FilterParams, Repository } from "@/application/interfaces";
import { TradingPlan } from "@/core/models";
import { database } from "@/infra/database";
import { tradingPlanTable } from "@/infra/database/schema";
import { toTradingPlan } from "@/utils/transforms";
import { TradingPlanDTO } from "@/application/dto";

export const tradingPlanRepository: Repository<TradingPlan> = {
	list: async (): Promise<TradingPlan[]> => {
		try {
			const data = await database.select().from(tradingPlanTable);
			return data.map<TradingPlan>(tradingPlan => toTradingPlan(tradingPlan));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<TradingPlan | null> => {
		try {
			const [data] = await database.select().from(tradingPlanTable).where(eq(tradingPlanTable.id, id));

			if (!data) {
				return null;
			}

			return toTradingPlan(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof TradingPlanDTO, value: any): Promise<TradingPlan | null> => {
		try {
			const [data] = await database.select().from(tradingPlanTable).where(eq(tradingPlanTable[field], value));

			if (!data) {
				return null;
			}

			return toTradingPlan(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	filter: async (params: FilterParams<TradingPlanDTO>[]): Promise<TradingPlan[] | null> => {

		const filters: SQL[] = [];

		params.forEach(({ field, value}) => {
			filters.push(eq(tradingPlanTable[field], value))
		})

		try {
			const data = await database.select().from(tradingPlanTable).where(and(...filters));
			return data.map<TradingPlan>(tradingPlan => toTradingPlan(tradingPlan));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},


	create: async (input: TradingPlanDTO | any): Promise<void> => {
		try {
			await database.insert(tradingPlanTable).values({
				id: input.id,
				nome: input.nome,
				usuarioId: input.usuarioId,
				link: input.link || null,
			});

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: TradingPlan | any): Promise<void> => {
		try {
			await database.update(tradingPlanTable).set({
				id: input.id,
				nome: input.nome,
				usuarioId: input.usuarioId,
				link: input.link || null,
			})
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		try {
			await database.delete(tradingPlanTable).where(eq(tradingPlanTable.id, id));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
