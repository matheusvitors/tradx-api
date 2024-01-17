import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { validateAtivo } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";

interface CreateAtivoControllerParams {
	repository: Repository<Ativo>;
	input: {
		nome: string;
		acronimo: string;
		tipo: string;
	}
}

export const createAtivoController = async ({ repository, input }: CreateAtivoControllerParams): Promise<ResponseData> => {

	try {

		const ativo: Partial<Ativo> = { id: newID(), nome: input.nome, acronimo: input.acronimo, tipo: input.tipo === 'acao' ? 'acao' : 'indice' };
		validateAtivo(ativo);

		await repository.create(ativo);
		return success(ativo);

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}

}
