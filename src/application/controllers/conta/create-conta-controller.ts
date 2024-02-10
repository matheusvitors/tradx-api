import { ContaDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository } from "@/core/interfaces"
import { Conta } from "@/core/models"
import { create } from "@/core/usecases/persist";
import { validateConta } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";

interface CreateContaControllerParams {
	repository: Repository<Conta>;
	input: Omit<ContaDTO, 'id'>;
}

export const createContaController = async (params: CreateContaControllerParams) => {
	try {

		const { input, repository } = params;

		console.log(input);
		const data: ContaDTO = {
			id: newID(),
			nome: input.nome,
			tipo: input.tipo,
			usuarioId: input.usuarioId
		}

		validateConta(data);

		const conta = await create<Conta>({repository, data});

		return success({conta});
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
