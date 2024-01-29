import { Repository, ResponseData } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { get } from "@/core/usecases/persist";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetAtivoControllerParams {
	repository: Repository<Ativo>;
	id: string;
}

export const getAtivoController = async (params: GetAtivoControllerParams): Promise<ResponseData> => {
	try {
		const ativo = await get<Ativo>(params);

		if(!ativo) {
			return notFound();
		}

		return success(ativo);
	} catch (error) {
		return serverError(error)
	}
}
