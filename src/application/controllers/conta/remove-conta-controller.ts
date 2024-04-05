import { Repository } from "@/application/interfaces"
import { Conta } from "@/core/models"
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface RemoveContaControllerParams {
	repository: Repository<Conta>
	id: string;
}

export const removeContaController = async (params: RemoveContaControllerParams) => {
	try {
		const { repository, id } = params;
		const conta = await repository.get(id)
		if(!conta) {
			return notFound();
		}
		await repository.remove(id);
		return success();
	} catch (error) {
		return serverError(error);
	}
}
