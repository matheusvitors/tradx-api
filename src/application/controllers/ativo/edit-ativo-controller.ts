import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { edit, get } from "@/core/usecases/persist";
import { validateAtivo } from "@/core/validators";
import { success, unprocessableEntity, serverError, notFound } from "@/infra/adapters/response-wrapper";

interface EditAtivoControllerParams {
	repository: Repository<Ativo>;
	input: Ativo;
}

export const editAtivoController = async ({ repository, input }: EditAtivoControllerParams): Promise<ResponseData> => {

	try {
		validateAtivo(input);

		const ativo = await get<Ativo>({repository, id:input.id});
		if(!ativo) {
			return notFound();
		}

		await edit<Ativo>({repository, data: input});
		return success(input);

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
