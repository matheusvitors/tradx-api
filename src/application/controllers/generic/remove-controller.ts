import { Repository, ResponseData } from "@/application/interfaces";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface RemoveControllerParams<T> {
	repository: Repository<T>;
	id: string;
}

export const removeController = async <T>(params: RemoveControllerParams<T>): Promise<ResponseData> => {
	try {
		const { id, repository } = params;
		const data = await repository.get(id);

		if(!data) {
			return notFound();
		}

		await repository.remove(id);
		return success(data);
	} catch (error) {
		return serverError(error)
	}
}
