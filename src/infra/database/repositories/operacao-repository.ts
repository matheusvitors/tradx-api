import { eq, SQL, and } from "drizzle-orm";
import { OperacaoDTO } from "@/application/dto";
import { FilterParams, Repository } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { database } from "@/infra/database";
import { operacaoTable } from "@/infra/database/schema";
import { toOperacao } from "@/utils/transforms";
import { newID } from "@/infra/adapters/newID";

export const operacaoRepository: Repository<Operacao, OperacaoDTO> = {
		list: async (): Promise<Operacao[]> => {
		try {
			const data = await database.select().from(operacaoTable);
			return data.map<Operacao>(operacao => toOperacao(operacao));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<Operacao | null> => {
		try {
			const [data] = await database.select().from(operacaoTable).where(eq(operacaoTable.id, id));

			if (!data) {
				return null;
			}

			return toOperacao(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof OperacaoDTO, value: any): Promise<Operacao | null> => {
		try {
			const [data] = await database.select().from(operacaoTable).where(eq(operacaoTable[field], value));

			if (!data) {
				return null;
			}

			return toOperacao(data);
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	filter: async (params: FilterParams<OperacaoDTO>[]): Promise<Operacao[] | null> => {

		const filters: SQL[] = [];

		params.forEach(({ field, value}) => {
			filters.push(eq(operacaoTable[field], value))
		})

		try {
			const data = await database.select().from(operacaoTable).where(and(...filters));
			return data.map<Operacao>(operacao => toOperacao(operacao));
		} catch (error) {
			console.error(error);
			throw error;
		}
	},


	create: async (input: OperacaoDTO): Promise<void> => {
		try {
			await database.insert(operacaoTable).values({
				id: input.id || newID(),
				ativoId: input.ativoId,
				contaId: input.contaId,
				regraEntradaId: input.regraEntradaId,
				quantidade: input.quantidade,
				tipo: input.tipo === 'compra' ? 'compra' : 'venda',
				precoEntrada: input.precoEntrada,
				stopLoss: input.stopLoss,
				alvo: input.alvo,
				precoSaida: input.precoSaida,
				dataEntrada: new Date(input.dataEntrada),
				dataSaida: input.dataSaida ? new Date(input.dataSaida) : null,
				operacaoPerdida: input.operacaoPerdida,
				operacaoErrada: input.operacaoErrada,
				comentarios: input.comentarios || null
			});

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: Operacao | any): Promise<void> => {
		try {
			await database.update(operacaoTable).set({
				id: input.id,
				ativoId: input.ativoId,
				contaId: input.contaId,
				regraEntradaId: input.regraEntradaId,
				quantidade: input.quantidade,
				tipo: input.tipo === 'compra' ? 'compra' : 'venda',
				precoEntrada: input.precoEntrada,
				stopLoss: input.stopLoss,
				alvo: input.alvo,
				precoSaida: input.precoSaida,
				dataEntrada: input.dataEntrada,
				dataSaida: input.dataSaida,
				operacaoPerdida: input.operacaoPerdida,
				operacaoErrada: input.operacaoErrada,
				comentarios: input.comentarios || undefined
			})
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		try {
			await database.delete(operacaoTable).where(eq(operacaoTable.id, id));
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

}
