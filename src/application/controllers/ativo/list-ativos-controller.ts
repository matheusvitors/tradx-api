import { Repository, ResponseData } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { list } from "@/core/usecases/persist";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listAtivosController = async (repository: Repository<Ativo>): Promise<ResponseData> => {
	try {
		const ativos = await list<Ativo>(repository);
		return success(ativos);
	} catch (error) {
		return serverError(error);
	}
}
