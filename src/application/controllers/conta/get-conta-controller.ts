import { Repository } from "@/core/interfaces"
import { Conta } from "@/core/models"
import { get } from "@/core/usecases/persist";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetContaControllerParams {
	repository: Repository<Conta>
	id: string;
}

export const getContaController = async (params: GetContaControllerParams) => {
	try {
		const conta = await get<Conta>(params);
		if(!conta) {
			return notFound();
		}

		return success({conta});
	} catch (error) {
		return serverError(error);
	}
}
