import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetAtivoControllerParams {
	repository: Repository<Ativo>;
	id: string;
}

export const getAtivoController = async (params: GetAtivoControllerParams): Promise<ResponseData> => {
	try {
		const { repository, id } = params;
		const ativo = await repository.get(id);

		if(!ativo) {
			return notFound();
		}

		return success(ativo);
	} catch (error) {
		return serverError(error)
	}
}
