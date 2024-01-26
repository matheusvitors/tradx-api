import { Repository } from "@/core/interfaces"
import { Conta } from "@/core/models"
import { get, remove } from "@/core/usecases/persist";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface RemoveContaControllerParams {
	repository: Repository<Conta>
	id: string;
}

export const removeContaController = async (params: RemoveContaControllerParams) => {
	try {
		const conta = await get<Conta>(params);
		if(!conta) {
			return notFound();
		}
		await remove<Conta>(params);
		return success();
	} catch (error) {
		return serverError(error);
	}
}
