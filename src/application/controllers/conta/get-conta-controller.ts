import { Repository } from "@/application/interfaces"
import { Conta } from "@/core/models"
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetContaControllerParams {
	repository: Repository<Conta>
	id: string;
}

export const getContaController = async (params: GetContaControllerParams) => {
	try {
		const { repository, id } = params;
		const conta = await repository.get(id);
		if(!conta) {
			return notFound();
		}

		return success(conta);
	} catch (error) {
		return serverError(error);
	}
}
