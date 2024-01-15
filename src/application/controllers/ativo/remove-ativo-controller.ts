import { Repository, ResponseData } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { get, remove } from "@/core/usecases/persist";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface RemoveAtivoControllerParams {
	repository: Repository<Ativo>;
	id: string;
}

export const removeAtivoController = async ({ id, repository }: RemoveAtivoControllerParams): Promise<ResponseData> => {
	try {
		const ativo = await get<Ativo>({id, repository});

		if(!ativo) {
			return notFound();
		}

		await remove<Ativo>({ repository, id });
		return success(ativo);
	} catch (error) {
		return serverError(error)
	}
}
