import { Repository } from "@/application/interfaces";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetControllerParams<T> {
	repository: Repository<T>
	id: string;
}

export const getController = async <T>(params: GetControllerParams<T>) => {
	try {
		const { repository, id } = params;
		const data = await repository.get(id);
		if(!data) {
			return notFound();
		}

		return success(data);
	} catch (error) {
		return serverError(error);
	}
}
