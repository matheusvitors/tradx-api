import { Prisma } from "@prisma/client";
import { OperacaoDTO } from "@/application/dto/operacao-dto";
import { FilterParams, Repository } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { databaseClient } from "@/infra/database/client";
import { ativosPrismaRepository } from "@/infra/database/prisma/ativo-prisma-repository";
import { contaPrismaRepository } from "@/infra/database/prisma/conta-prisma-repository";
import { toAtivo, toConta, toOperacao } from "@/utils/transforms";

export const operacaoPrismaRepository: Repository<Operacao> = {
	list: async (): Promise<Operacao[]> => {
		try {
			const data = await databaseClient.operacao.findMany({
				include: {ativo: true, conta: true},
				orderBy: [
					{ dataSaida: {sort: 'desc', nulls: 'first'}},
					{ dataEntrada: 'asc'},
				]
			});

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
			const data = await databaseClient.operacao.findUnique({ where: {id}, include: {ativo: true, conta: true}});
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
			const data = await databaseClient.operacao.findMany({
				where,
				include: {ativo: true, conta: true},
				orderBy: [
					{ dataSaida: {sort: 'desc', nulls: 'first'}},
					{ dataEntrada: 'desc'},
				]
			});

			const operacoes: Operacao[] = data.map(operacao => {
				return toOperacao(operacao);
			})

			return operacoes;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	create: async (input: OperacaoDTO): Promise<Operacao> => {

		try {
			const { ativoId, contaId, ...rest  } = input;

			const result = await databaseClient.operacao.create({
				data: {
					...rest,
					conta: {connect: { id: contaId }},
					ativo: {connect: { id: ativoId }}
				}
			});

			const ativo = await ativosPrismaRepository.get(ativoId);
			const conta = await contaPrismaRepository.get(contaId);

			const operacao: Operacao = toOperacao({...result, ativo: toAtivo(ativo), conta: toConta(conta)});

			return operacao;

		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	edit: async (input: OperacaoDTO): Promise<Operacao | null> => {
		try {
			const {id, ativoId, contaId, ...rest} = input;
			const result = await databaseClient.operacao.update({
				where: {id},
				data: {
					...rest,
					conta: {connect: { id: contaId }},
					ativo: {connect: { id: ativoId }},
				}
			});

			if(result) {
				let {ativoId, contaId, ...cleanResult } = result;
				const ativo = await ativosPrismaRepository.get(ativoId);
				const conta = await contaPrismaRepository.get(contaId);

				const operacao: Operacao = toOperacao({...cleanResult, ativo: toAtivo(ativo), conta: toConta(conta)});
				return operacao;
			}

			return null;
		} catch (error) {
			throw error;
		}
	},

	remove: async (id: string): Promise<void> => {
		await databaseClient.operacao.delete({where: {id}})
	}
}
