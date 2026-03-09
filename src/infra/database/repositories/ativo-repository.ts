import { and, eq, SQL } from "drizzle-orm";
import { Repository } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { database } from "@/infra/database";
import { ativoTable } from "@/infra/database/schema";

export const ativoRepository: Repository<Ativo> = {
	list: async (): Promise<Ativo[]> => {
		try {
			const data = await database.select().from(ativoTable);
			return data.map<Ativo>((ativo) => {
				return {
					id: ativo.id,
					nome: ativo.nome,
					acronimo: ativo.acronimo,
					multiplicador: ativo.multiplicador,
					tipo: ativo.tipo === "indice" ? "indice" : "acao",
					dataVencimento: ativo.dataVencimento || undefined,
				};
			});
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

			return {
				id: data.id,
				nome: data.nome,
				acronimo: data.acronimo,
				multiplicador: data.multiplicador,
				tipo: data.tipo === "indice" ? "indice" : "acao",
				dataVencimento: data.dataVencimento || undefined,
			};
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

				return {
					id: data.id,
					nome: data.nome,
					acronimo: data.acronimo,
					multiplicador: data.multiplicador,
					tipo: data.tipo === "indice" ? "indice" : "acao",
					dataVencimento: data.dataVencimento || undefined,
				};
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
			const data = await database.select().from(notaFiscalTable).where(and(...filters));

			const notasFiscais: NotaFiscalDTO[] = data.map(nf => {return {
				id: nf.id,
				description: nf.description,
				link: nf.link,
				data: format(new Date(nf.data), 'yyyy-MM-dd'),
				check: nf.check,
			}})

			return notasFiscais;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},


	create: async (input: Ativo | any): Promise<void> => {
		throw new Error("Function not implemented.");
	},

	edit: async (input: Ativo | any): Promise<Ativo | null> => {
		throw new Error("Function not implemented.");
	},

	remove: async (id: string): Promise<void> => {
		throw new Error("Function not implemented.");
	},
};
