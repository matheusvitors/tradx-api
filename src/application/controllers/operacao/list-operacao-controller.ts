import { Repository, ResponseData } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { list } from "@/core/usecases/persist";
import { success, serverError } from "@/infra/adapters/response-wrapper";

export const listOperacaoController = async (repository: Repository<Operacao>): Promise<ResponseData> => {
	try {
		const operacoes = await list<Operacao>(repository);
		return success(operacoes);
	} catch (error) {
		return serverError(error);
	}
}
