import { Repository, ResponseData } from "@/application/interfaces";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listController = async <T, D>(repository: Repository<T, D>): Promise<ResponseData> => {
	try {
		const data = await repository.list();
		return success(data);
	} catch (error) {
		return serverError(error);
	}
}
