import { AtivoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo } from "@/core/models";
import { validateAtivo } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { conflict, serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";
import { format } from "node:util";

interface CreateAtivoControllerParams {
	repository: Repository<Ativo>;
	input: AtivoDTO
}

export const createAtivoController = async (params: CreateAtivoControllerParams): Promise<ResponseData> => {

	try {
		const { input, repository } = params;

		const hasAcronimo = repository.find && await repository.find('acronimo', input.acronimo);

		if(hasAcronimo){
			return conflict('Acronimo não pode ter duplicação');
		}

		const ativo: AtivoDTO = {
			id: newID(),
			nome: input.nome,
			acronimo: input.acronimo,
			tipo: input.tipo,
			multiplicador: input.multiplicador || 1,
			dataVencimento: input.dataVencimento ? new Date(`${format(input.dataVencimento, 'yyyy-MM-dd')} 23:59`) : undefined
		};

		validateAtivo(ativo);

		await repository.create(ativo);
		return success(ativo);

	} catch (error) {
		console.error(error);

		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}

}
