import { Repository, ResponseData } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { success, serverError } from "@/infra/adapters/response-wrapper";

export const listOperacaoController = async (repository: Repository<Operacao>): Promise<ResponseData> => {
	try {
		const operacoes = await repository.list();
		return success(operacoes);
	} catch (error) {
		return serverError(error);
	}
}
