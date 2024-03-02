import { Repository } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { databaseClient } from "@/infra/database/client";
import { toAtivo } from "@/utils/transforms";

export const ativosPrismaRepository: Repository<Ativo> = {
	list: async (): Promise<Ativo[]> => {
		const data = await databaseClient.ativo.findMany();
		const ativos: Ativo[] = data.map(ativo => { return toAtivo(ativo)})

		return ativos;
	},

	get: async (id: string): Promise<Ativo | null> => {
		const data = await databaseClient.ativo.findUnique({ where: {id}});

		if(data) {
			const ativo: Ativo = toAtivo(data);
			return ativo;
		}

		return null;
	},

	find: async (field: keyof Ativo, value: any): Promise<Ativo | null> => {
		const data = await databaseClient.ativo.findFirst({ where: {[field]: value}});

		if(data) {
			const ativo: Ativo = toAtivo(data);
			return ativo;
		}

		return null;
	},

	filter: function (params: any): Promise<Ativo[] | null> {
		throw new Error("Function not implemented.");
	},

	create: async (data: Ativo): Promise<Ativo> => {
		const result = await databaseClient.ativo.create({ data });
		const ativo: Ativo = toAtivo(result);
		return ativo;
	},

	edit: async (data: Ativo): Promise<Ativo | null> => {
		const result = await databaseClient.ativo.update({where: {id: data.id}, data});

		if(result) {
			const ativo: Ativo = toAtivo(result);
			return ativo;
		}

		return null;

	},

	remove: async (id: string): Promise<void> => {
		await databaseClient.ativo.delete({where: {id}})
	}
}
