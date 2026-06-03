import { eq, SQL, and } from "drizzle-orm";
import { FilterParams, Repository } from "@/application/interfaces";
import { Conta } from "@/core/models";
import { database } from "@/infra/database";
import { contaTable, usuarioTable } from "@/infra/database/schema";
import { toConta } from "@/utils/transforms";
import { ContaDTO } from "@/application/dto";
import { newID } from "@/infra/adapters/newID";

export const contaRepository: Repository<Conta, ContaDTO> = {
	list: async (): Promise<Conta[]> => {
		try {
			const data = await database.select()
			.from(contaTable)

			return data.map<Conta>(conta => toConta(conta));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<Conta | null> => {
		try {
			const [data] = await database.select()
				.from(contaTable)
				.where(eq(contaTable.id, id))

			if (!data) {
				return null;
			}

			return toConta(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof ContaDTO, value: any): Promise<Conta | null> => {
		try {
			const [data] = await database.select().from(contaTable).where(eq(contaTable[field], value));

			if (!data) {
				return null;
			}

			return toConta(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	filter: async (params: FilterParams<ContaDTO>[]): Promise<Conta[] | null> => {

		const filters: SQL[] = [];

		params.forEach(({ field, value}) => {
			filters.push(eq(contaTable[field], value))
		})

		try {
			const data = await database.select().from(contaTable).where(and(...filters));
			return data.map<Conta>(conta => toConta(conta));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},


	create: async (input: ContaDTO): Promise<void> => {
		try {
			await database.insert(contaTable).values({
				id: input.id || newID(),
				nome: input.nome,
				tipo: input.tipo,
				usuarioId: input.usuarioId!,
				saldo: input.saldo ? input.saldo * 100 : 0 ,
				saldoInicial: input.saldoInicial * 100
			});

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: ContaDTO): Promise<void> => {
		try {
			await database.update(contaTable).set({
				nome: input.nome,
				tipo: input.tipo,
				saldo: input.saldo ? input.saldo * 100 : 0 ,
				saldoInicial: input.saldoInicial * 100
			})
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		try {
			await database.delete(contaTable).where(eq(contaTable.id, id));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},}
