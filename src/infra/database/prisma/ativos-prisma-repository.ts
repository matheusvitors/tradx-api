import { Repository } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { databaseClient } from "@/infra/database/client";

export const ativosPrismaRepository: Repository<Ativo> = {
	list: async (): Promise<Ativo[]> => {
		const data = await databaseClient.ativo.findMany();
		const ativos: Ativo[] = data.map(ativo => { return {
			id: ativo.id,
			nome: ativo.nome,
			acronimo: ativo.acronimo,
			tipo: ativo.tipo === 'acao' ? 'acao' : 'indice'
		}})

		return ativos;
	},
	get: async (id: string): Promise<Ativo | null> => {
		const data = await databaseClient.ativo.findUnique({ where: {id}});

		if(data) {
			const ativo: Ativo = {
				id: data.id,
				nome: data.nome,
				acronimo: data.acronimo,
				tipo: data.tipo === 'acao' ? 'acao' : 'indice'
			}
			return ativo;
		}

		return null;

	},

	find: function (field: string | number | symbol, value: any): Promise<any> {
		throw new Error("Function not implemented.");
	},

	filter: function (field: string | number | symbol, value: any): Promise<Ativo[] | null> {
		throw new Error("Function not implemented.");
	},

	create: async (data: Ativo): Promise<Ativo> => {
		const result = await databaseClient.ativo.create({ data });

		const ativo: Ativo = {
			id: result.id,
			nome: result.nome,
			acronimo: result.acronimo,
			tipo: result.tipo === 'acao' ? 'acao' : 'indice'
		}
		return ativo;

	},
	edit: async (data: Ativo): Promise<Ativo | null> => {
		const result = await databaseClient.ativo.update({where: {id: data.id}, data});

		if(result) {
			const ativo: Ativo = {
				id: result.id,
				nome: result.nome,
				acronimo: result.acronimo,
				tipo: result.tipo === 'acao' ? 'acao' : 'indice'
			}
			return ativo;
		}

		return null;

	},
	remove: async (id: string): Promise<void> => {
		await databaseClient.ativo.delete({where: {id}})
	}
}
