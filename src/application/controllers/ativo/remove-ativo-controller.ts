import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface RemoveAtivoControllerParams {
	repository: Repository<Ativo>;
	id: string;
}

export const removeAtivoController = async ({ id, repository }: RemoveAtivoControllerParams): Promise<ResponseData> => {
	try {
		const ativo = await repository.get(id);

		if(!ativo) {
			return notFound();
		}

		await repository.remove(id);
		return success(ativo);
	} catch (error) {
		return serverError(error)
	}
}
