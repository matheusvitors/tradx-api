import { Repository, ResponseData } from "@/application/interfaces";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listController = async <T>(repository: Repository<T>): Promise<ResponseData> => {
	try {
		const data = await repository.list();
		return success(data);
	} catch (error) {
		return serverError(error);
	}
}
