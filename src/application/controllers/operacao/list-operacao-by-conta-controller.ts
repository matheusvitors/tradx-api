import { OperacaoDTO } from "@/application/dto";
import { Repository, ResponseData } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { success, serverError, notFound } from "@/infra/adapters/response-wrapper";

interface ListOperacaoByContaControllerParams {
	repository: Repository<Operacao>;
	contaId: string;
}

export const listOperacaoByContaController = async (params: ListOperacaoByContaControllerParams): Promise<ResponseData> => {
	try {
		const { repository, contaId } = params;
		const operacoes = await repository.filter([{ field: 'contaId', value: contaId}]);

		if(!operacoes) {
			return notFound();
		}

		return success(operacoes);
	} catch (error) {
		return serverError(error);
	}
}
