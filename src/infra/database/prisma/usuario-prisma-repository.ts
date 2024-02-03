import { Repository } from "@/core/interfaces";
import { Usuario } from "@/core/models";
import { databaseClient } from "@/infra/database/client";

export const usuarioPrismaRepository: Repository<Usuario> = {
	list: async (): Promise<Usuario[]> => {
		return await databaseClient.usuario.findMany();
	},
	get: async (id: string): Promise<Usuario | null> => {
		return await databaseClient.usuario.findUnique({ where: {id}});
	},
	find: async (field: keyof Usuario, value: any): Promise<Usuario | null> => {
		//TODO: fazer do jeito certo o find do user
		return await databaseClient.usuario.findUnique({where: {username: value}});
	},
	filter: async (field: keyof Usuario, value: any): Promise<Usuario[] | null> => {
		throw new Error("Function not implemented.");
	},
	create: async (data: any): Promise<Usuario> => {
		throw new Error("Function not implemented.");
	},
	edit: async (data: any): Promise<Usuario | null> => {
		throw new Error("Function not implemented.");
	},
	remove: async (id: string): Promise<void> => {
		throw new Error("Function not implemented.");
	}
}
