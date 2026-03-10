import { and, eq, SQL } from "drizzle-orm";
import { FilterParams, Repository } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { database } from "@/infra/database";
import { ativoTable } from "@/infra/database/schema";
import { toAtivo } from "@/utils/transforms";

export const ativoRepository: Repository<Ativo> = {
	list: async (): Promise<Ativo[]> => {
		try {
			const data = await database.select().from(ativoTable);
			return data.map<Ativo>(ativo => toAtivo(ativo));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<Ativo | null> => {
		try {
			const [data] = await database.select().from(ativoTable).where(eq(ativoTable.id, id));

			if (!data) {
				return null;
			}

			return toAtivo(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof Ativo, value: any): Promise<Ativo | null> => {
		try {
			const [data] = await database.select().from(ativoTable).where(eq(ativoTable[field], value));

			if (!data) {
				return null;
			}

			return toAtivo(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	filter: async (params: FilterParams<Ativo>[]): Promise<Ativo[] | null> => {

		const filters: SQL[] = [];

		params.forEach(({ field, value}) => {
			filters.push(eq(ativoTable[field], value))
		})

		try {
			const data = await database.select().from(ativoTable).where(and(...filters));
			return data.map<Ativo>(ativo => toAtivo(ativo));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},


	create: async (input: Ativo | any): Promise<void> => {
		try {
			await database.insert(ativoTable).values({
				id: input.id,
				nome: input.nome,
				acronimo: input.acronimo,
				tipo: input.tipo,
				multiplicador: input.multiplicador,
				dataVencimento: input.dataVencimento
			});

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: Ativo | any): Promise<void> => {
		try {
			await database.update(ativoTable).set({
				id: input.id,
				nome: input.nome,
				acronimo: input.acronimo,
				tipo: input.tipo,
				multiplicador: input.multiplicador,
				dataVencimento: input.dataVencimento
			})
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		try {
			await database.delete(ativoTable).where(eq(ativoTable.id, id));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};
