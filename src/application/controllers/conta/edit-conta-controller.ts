import { ContaDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository } from "@/application/interfaces";
import { Conta } from "@/core/models";
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
		console.log(savedConta);



		if(!savedConta){
			return notFound();
		}

		validateConta(input);

		const editedConta: ContaDTO = {
			...input,
			saldo: savedConta.saldoInicial !== input.saldoInicial ? (savedConta.saldo - savedConta.saldoInicial) + input.saldoInicial : savedConta.saldo
		}

		console.log(savedConta.saldo,savedConta.saldoInicial, input.saldoInicial);


		const conta = await repository.edit(editedConta);
		console.log('editedConta', editedConta, input.saldoInicial);


		console.log(conta);


		return success({conta});
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
