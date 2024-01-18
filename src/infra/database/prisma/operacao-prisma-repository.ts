import { Repository } from "@/core/interfaces";
import { Operacao } from "@/core/models";
import { databaseClient } from "@/infra/database/client";

export const operacaoPrismaRepository: Repository<Operacao> = {
	list: async (): Promise<Operacao[]> => {
		throw new Error("Function not implemented.");
	},

	get: async (id: string): Promise<Operacao | null> => {
		throw new Error("Function not implemented.");
	},

	find: async (field: keyof Operacao, value: any): Promise<Operacao | null> => {
		throw new Error("Function not implemented.");
	},

	filter: async (field: keyof Operacao, value: any): Promise<Operacao[] | null> => {
		throw new Error("Function not implemented.");
	},

	create: async (data: Operacao): Promise<Operacao> => {
		throw new Error("Function not implemented.");
	},

	edit: async (data: Operacao): Promise<Operacao | null> => {
		throw new Error("Function not implemented.");
	},

	remove: async (id: string): Promise<void> => {
		await databaseClient.operacao.delete({where: {id}})
	}
}
