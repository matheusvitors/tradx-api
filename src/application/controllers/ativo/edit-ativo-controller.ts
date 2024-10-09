import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { validateAtivo } from "@/core/validators";
import { success, unprocessableEntity, serverError, notFound, conflict } from "@/infra/adapters/response-wrapper";

interface EditAtivoControllerParams {
	repository: Repository<Ativo>;
	input: Ativo;
}

export const editAtivoController = async (params: EditAtivoControllerParams): Promise<ResponseData> => {

	try {
		const {input, repository } = params
		validateAtivo(input);

		const ativo = await repository.get(input.id);

		if(!ativo) {
			return notFound();
		}

		if(input.acronimo !== ativo.acronimo) {
			const ativoAcronimoVerification = await repository.find!('acronimo', input.acronimo);

			if(ativoAcronimoVerification && ativoAcronimoVerification.id !== input.id) {
				return conflict('Acronimo não pode ter duplicação');
			}
		}

		await repository.edit(input)
		return success(input);

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
