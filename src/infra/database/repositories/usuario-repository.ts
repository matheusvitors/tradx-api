import { Repository } from "@/application/interfaces";
import { Usuario } from "@/core/models";
import { database } from "@/infra/database";
import { usuarioTable } from "@/infra/database/schema";
import { toUsuario } from "@/utils/transforms";
import { eq } from "drizzle-orm";

export const usuarioRepository: Repository<Usuario, Usuario> = {
	list: async (): Promise<Usuario[]> => {
		throw new Error("Function not implemented.");

	},

	get: async (id: string): Promise<Usuario | null> => {
		try {

			const [data] = await database.select().from(usuarioTable).where(eq(usuarioTable.id, id));

			if(!data) {
				return null;
			}

			return toUsuario(data);

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	create: async (input: Usuario): Promise<void> => {
		try {
			await database.insert(usuarioTable).values({
				id: input.id,
				nome: input.nome,
				username: input.username,
				password: input.password,
				email: input.email
			});

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: function (data: Usuario | any): Promise<void> {
		throw new Error("Function not implemented.");
	},

	remove: function (id: string): Promise<void> {
		throw new Error("Function not implemented.");
	}
}
