import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { FilterParams, Repository } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { databaseClient } from "@/infra/database/client";
import { ativosPrismaRepository } from "@/infra/database/prisma/ativo-prisma-repository";
import { toAtivo, toOperacao } from "@/utils/transforms";
import { Prisma } from "@prisma/client";

export const operacaoPrismaRepository: Repository<Operacao> = {
	list: async (): Promise<Operacao[]> => {
		try {
			const data = await databaseClient.operacao.findMany({include: {ativo: true}});
			const operacoes: Operacao[] = data.map(operacao => {
				return toOperacao(operacao);
			})

			return operacoes;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	get: async (id: string): Promise<Operacao | null> => {
		try {
			const data = await databaseClient.operacao.findUnique({ where: {id}, include: {ativo: true}});
			if(data) {
				const operacao: Operacao = toOperacao(data);
				return operacao;
			}

			return null;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	find: async (field: keyof Operacao, value: any): Promise<Operacao | null> => {
		throw new Error("Function not implemented.");
	},

	filter: async (params: FilterParams<OperacaoDTO>[]): Promise<Operacao[] | null> => {
		const where: Prisma.OperacaoWhereInput  = params.reduce(
			(obj, item) => Object.assign(obj, { [item.field]: item.value }), {});

		try {
			const data = await databaseClient.operacao.findMany({where,  include: {ativo: true}});
			const operacoes: Operacao[] = data.map(operacao => {
				return toOperacao(operacao);
			})

			return operacoes;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	create: async (data: OperacaoDTO): Promise<Operacao> => {
		try {
			const result = await databaseClient.operacao.create({ data });
			let {ativoId, ...cleanResult } = result;
			const ativo = await ativosPrismaRepository.get(ativoId);

			const operacao: Operacao = toOperacao({...cleanResult, ativo: toAtivo(ativo)});

			return operacao;

		} catch (error) {
			console.error(error);
			throw error;
		}
},

	edit: async (data: OperacaoDTO): Promise<Operacao | null> => {
		const {id, ...restData} = data;
		const result = await databaseClient.operacao.update({where: {id}, data: restData});

		if(result) {
			let {ativoId, ...cleanResult } = result;
			const ativo = await ativosPrismaRepository.get(ativoId);
			const operacao: Operacao = toOperacao({...cleanResult, ativo: toAtivo(ativo)});
			return operacao;
		}

		return null;
	},

	remove: async (id: string): Promise<void> => {
		await databaseClient.operacao.delete({where: {id}})
	}
}
