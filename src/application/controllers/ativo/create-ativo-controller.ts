import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { validateAtivo } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { conflict, serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";

interface CreateAtivoControllerParams {
	repository: Repository<Ativo>;
	input: Omit<Ativo, 'id'>
}

export const createAtivoController = async (params: CreateAtivoControllerParams): Promise<ResponseData> => {

	try {
		const { input, repository } = params;


		const hasAcronimo = await repository.find('acronimo', input.acronimo);
		console.log(hasAcronimo);

		if(hasAcronimo){
			return conflict('Acronimo não pode ter duplicação');
		}

		const ativo: Ativo = {
			id: newID(),
			nome: input.nome,
			acronimo: input.acronimo,
			tipo: input.tipo === 'acao' ? 'acao' : 'indice',
			dataVencimento: input.dataVencimento
		};

		validateAtivo(ativo);

		await repository.create(ativo);
		return success(ativo);

	} catch (error) {
		console.log(error);

		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}

}
