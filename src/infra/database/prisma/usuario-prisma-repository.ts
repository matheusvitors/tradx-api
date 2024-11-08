import { Repository } from "@/application/interfaces";
import { Usuario } from "@/core/models";
import { database } from "@/infra/database/database";

export const usuarioPrismaRepository: Repository<Usuario> = {
	list: async (): Promise<Usuario[]> => {
		return await database.usuario.findMany();
	},
	get: async (id: string): Promise<Usuario | null> => {
		return await database.usuario.findUnique({ where: {id}});
	},
	find: async (field: keyof Usuario, value: any): Promise<Usuario | null> => {
		//TODO: fazer do jeito certo o find do user
		return await database.usuario.findUnique({where: {username: value}});
	},
	filter: async (params: any): Promise<Usuario[] | null> => {
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
