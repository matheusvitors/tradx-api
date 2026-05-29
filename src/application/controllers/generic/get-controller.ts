import { Repository } from "@/application/interfaces";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetControllerParams<T, D> {
	repository: Repository<T, D>
	id: string;
}

export const getController = async <T, D>(params: GetControllerParams<T, D>) => {
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
