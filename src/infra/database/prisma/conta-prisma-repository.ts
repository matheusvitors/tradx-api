import { Repository } from "@/core/interfaces";
import { Conta } from "@/core/models";
import { databaseClient } from "@/infra/database/client";

export const contaPrismaRepository: Repository<Conta> = {
	list: async (): Promise<Conta[]> => {
		const result = await databaseClient.conta.findMany({include: { usuario: true }});
		return contas;
	},

	get: async (id: string): Promise<Conta | null> => {
		throw new Error("Function not implemented.");
	},

	find: async (field: keyof Conta, value: any): Promise<Conta | null> => {
		throw new Error("Function not implemented.");
	},

	filter: async (field: keyof Conta, value: any): Promise<Conta[] | null> => {
		throw new Error("Function not implemented.");
	},

	create: async (data: any): Promise<Conta> => {
		throw new Error("Function not implemented.");
	},

	edit: async (data: any): Promise<Conta | null> => {
		throw new Error("Function not implemented.");
	},

	remove: async (id: string): Promise<void> => {
		throw new Error("Function not implemented.");
	}
}
