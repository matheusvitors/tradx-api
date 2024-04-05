import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listAtivosController = async (repository: Repository<Ativo>): Promise<ResponseData> => {
	try {
		const ativos = await repository.list();
		return success(ativos);
	} catch (error) {
		return serverError(error);
	}
}
