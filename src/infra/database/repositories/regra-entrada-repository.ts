import { eq, SQL, and } from "drizzle-orm";
import { Repository, FilterParams } from "@/application/interfaces";
import { RegraEntrada } from "@/core/models";
import { database } from "@/infra/database";
import { toRegraEntrada } from "@/utils/transforms";
import { regraEntradaTable } from "@/infra/database/schema";
import { RegraEntradaDTO } from "@/application/dto";

export const regraEntradaRepository: Repository<RegraEntrada> = {
	list: async (): Promise<RegraEntrada[]> => {
		try {
			const data = await database.select().from(regraEntradaTable);
			return data.map<RegraEntrada>(regraEntrada => toRegraEntrada(regraEntrada));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<RegraEntrada | null> => {
		try {
			const [data] = await database.select().from(regraEntradaTable).where(eq(regraEntradaTable.id, id));

			if (!data) {
				return null;
			}

			return toRegraEntrada(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof RegraEntradaDTO, value: any): Promise<RegraEntrada | null> => {
		try {
			const [data] = await database.select().from(regraEntradaTable).where(eq(regraEntradaTable[field], value));

			if (!data) {
				return null;
			}

			return toRegraEntrada(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	filter: async (params: FilterParams<RegraEntradaDTO>[]): Promise<RegraEntrada[] | null> => {

		const filters: SQL[] = [];

		params.forEach(({ field, value}) => {
			filters.push(eq(regraEntradaTable[field], value))
		})

		try {
			const data = await database.select().from(regraEntradaTable).where(and(...filters));
			return data.map<RegraEntrada>(regraEntrada => toRegraEntrada(regraEntrada));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},


	create: async (input: RegraEntradaDTO | any): Promise<void> => {
		try {
			await database.insert(regraEntradaTable).values({
				id: input.id,
				nome: input.nome,
				tradingPlanId: input.tradingPlanId,
			});

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: RegraEntrada | any): Promise<void> => {
		try {
			await database.update(regraEntradaTable).set({
				id: input.id,
				nome: input.nome,
				tradingPlanId: input.tradingPlanId,
			})
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		try {
			await database.delete(regraEntradaTable).where(eq(regraEntradaTable.id, id));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
