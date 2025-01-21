import { Repository, ResponseData } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { success, serverError, notFound } from "@/infra/adapters/response-wrapper";

interface RangeData {
	init: string;
	end: string;
}

interface ListOperacaoByContaControllerParams {
	repository: Repository<Operacao>;
	contaId: string;
	range: RangeData;
}

export const listOperacaoByContaController = async (params: ListOperacaoByContaControllerParams): Promise<ResponseData> => {
	try {

		const { repository, contaId, range } = params;
		const operacoes = await repository.filter!([
			{ field: 'contaId', value: contaId },
			{ field: 'dataEntrada', value: { gte: new Date(`${range.init} 00:00`), lte: new Date(`${range.end} 23:59`)}}
		]);

		if(!operacoes) {
			return notFound();
		}

		return success(operacoes);
	} catch (error) {
		return serverError(error);
	}
}
