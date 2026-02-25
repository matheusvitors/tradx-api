import { Repository } from "@/application/interfaces";
import { Usuario } from "@/core/models";
import { database } from "@/infra/database/database";
import { usuarioTable } from "@/infra/database/schema";

export const usuarioRepository: Repository<Usuario> = {
	list: async (): Promise<Usuario[]> => {
		try {

			const data = await database.select().from(usuarioTable);

			const usuarios: Usuario[] = data.map(usuario => ({
				id: usuario.id,
				nome: usuario.nome,
				username: usuario.username,
				password: usuario.password,
				email: usuario.email
			}));
			return usuarios;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: function (id: string): Promise<Usuario | null> {
		throw new Error("Function not implemented.");
	},

	create: function (data: Usuario | any): Promise<Usuario> {
		throw new Error("Function not implemented.");
	},

	edit: function (data: Usuario | any): Promise<Usuario | null> {
		throw new Error("Function not implemented.");
	},

	remove: function (id: string): Promise<void> {
		throw new Error("Function not implemented.");
	}
}
