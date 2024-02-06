import { Repository, ResponseData } from "@/core/interfaces";
import { Conta } from "@/core/models";
import { list } from "@/core/usecases/persist";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listContasController = async (repository: Repository<Conta>): Promise<ResponseData> => {
	try {
		const contas = await list<Conta>(repository);
		return success(contas);
	} catch (error) {
		return serverError(error);
	}
}
