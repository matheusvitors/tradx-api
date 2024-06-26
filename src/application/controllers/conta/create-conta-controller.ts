import { ContaDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository } from "@/application/interfaces"
import { Conta } from "@/core/models"
import { validateConta } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";

interface CreateContaControllerParams {
	repository: Repository<Conta>;
	input: Omit<ContaDTO, 'id' | 'saldo'>;
}

export const createContaController = async (params: CreateContaControllerParams) => {
	try {

		const { input, repository } = params;

		const data: ContaDTO = {
			id: newID(),
			nome: input.nome,
			tipo: input.tipo,
			usuarioId: input.usuarioId,
			saldoInicial: input.saldoInicial || 0.00,
			saldo: input.saldoInicial || 0.00
		}

		validateConta(data);

		const conta = await repository.create(data)

		return success({conta});
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
