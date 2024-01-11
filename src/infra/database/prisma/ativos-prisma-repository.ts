import { Repository } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { databaseClient } from "@/infra/database/client";

export const ativosPrismaRepository: Repository<Ativo> = {
	list: async (): Promise<Ativo[]> => {
		const data = await databaseClient.ativo.findMany();
		const ativos: Ativo[] = data.map(ativo => { return {
			id: ativo.id,
			nome: ativo.nome,
			acronimo: ativo.acronimo
		}})

		return ativos;
	},
	get: function (id: string): Promise<any> {
		throw new Error("Function not implemented.");
	},
	find: function (field: string | number | symbol, value: any): Promise<any> {
		throw new Error("Function not implemented.");
	},
	filter: function (field: string | number | symbol, value: any): Promise<Ativo[] | null> {
		throw new Error("Function not implemented.");
	},
	create: async (data: Ativo): Promise<Ativo> => {
		return  await databaseClient.ativo.create({ data });
	},
	edit: function (data: Ativo): Promise<any> {
		throw new Error("Function not implemented.");
	},
	remove: function (id: string): Promise<void> {
		throw new Error("Function not implemented.");
	}
}
