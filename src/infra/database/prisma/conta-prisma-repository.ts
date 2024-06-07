import { ContaDTO } from "@/application/dto";
import { Repository } from "@/application/interfaces";
import { Conta } from "@/core/models";
import { databaseClient } from "@/infra/database/client";
import { toConta } from "@/utils/transforms";

export const contaPrismaRepository: Repository<Conta> = {
	list: async (): Promise<Conta[]> => {
		try {
			const data = await databaseClient.conta.findMany({include: { usuario: true }});
			const contas: Conta[] = data.map(conta => toConta(conta));
			return contas;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<Conta | null> => {
		try {
			const data = await databaseClient.conta.findUnique({
				where: {id},
				include: { usuario: true }
			})

			if(data) {
				return toConta(data);
			}

			return null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof Conta, value: any): Promise<Conta | null> => {
		throw new Error("Function not implemented.");
	},

	filter: async (params: any): Promise<Conta[] | null> => {
		throw new Error("Function not implemented.");
	},

	create: async (input: ContaDTO): Promise<Conta> => {
		try {
			const { usuarioId, ...rest } = input;
			const result = await databaseClient.conta.create({
				data: {
					...rest,
					usuario: {connect: { id: usuarioId }}
				},
				include: {
					usuario: true
				}
			});
			return toConta(result);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: Conta): Promise<Conta | null> => {
		try {
			const { usuario, ...rest } = input;
			const result = await databaseClient.conta.update({
				data: {
					...rest,
					usuario: {connect: usuario}
				},
				include: { usuario: true },
				where: {
					id: input.id
				}
			});
			return toConta(result);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		try {
			await databaseClient.conta.delete({where: {id}})
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
