import { ContaDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository } from "@/application/interfaces";
import { Conta } from "@/core/models";
import { edit, get } from "@/core/usecases/persist";
import { validateConta } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { success, unprocessableEntity, serverError, notFound } from "@/infra/adapters/response-wrapper";

interface EditContaControllerParams {
	repository: Repository<Conta>;
	input: ContaDTO;
}

export const editContaController = async (params: EditContaControllerParams) => {
	try {
		const { input, repository } = params;

		const savedConta = await repository.get(input.id);

		if(!savedConta){
			return notFound();
		}

		validateConta(input);

		const editedConta: ContaDTO = {
			...input,
			saldo: savedConta.saldoInicial !== input.saldoInicial ? (savedConta.saldo - savedConta.saldoInicial) + input.saldoInicial : savedConta.saldo
		}

		const conta = await repository.edit(editedConta);

		return success({conta});
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
