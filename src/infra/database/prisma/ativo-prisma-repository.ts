import { Repository } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { database } from "@/infra/database/database";
import { toAtivo } from "@/utils/transforms";

export const ativosPrismaRepository: Repository<Ativo> = {
	list: async (): Promise<Ativo[]> => {
		const data = await database.ativo.findMany({
			orderBy: [
				{ acronimo: 'asc'},
			]
		});
		const ativos: Ativo[] = data.map(ativo => { return toAtivo(ativo)})

		return ativos;
	},

	get: async (id: string): Promise<Ativo | null> => {
		const data = await database.ativo.findUnique({ where: {id}});

		if(data) {
			const ativo: Ativo = toAtivo(data);
			return ativo;
		}

		return null;
	},

	find: async (field: keyof Ativo, value: any): Promise<Ativo | null> => {
		const data = await database.ativo.findFirst({ where: {[field]: value}});

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
		const result = await database.ativo.create({ data });
		const ativo: Ativo = toAtivo(result);
		return ativo;
	},

	edit: async (data: Ativo): Promise<Ativo | null> => {
		const result = await database.ativo.update({where: {id: data.id}, data});

		if(result) {
			const ativo: Ativo = toAtivo(result);
			return ativo;
		}

		return null;

	},

	remove: async (id: string): Promise<void> => {
		await database.ativo.delete({where: {id}})
	}
}
