import { Repository, ResponseData } from "@/application/interfaces";
import { Conta } from "@/core/models";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listContasController = async (repository: Repository<Conta>): Promise<ResponseData> => {
	try {
		const contas = await repository.list();
		return success(contas);
	} catch (error) {
		return serverError(error);
	}
}
