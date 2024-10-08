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

		if(!input.id) {
			return unprocessableEntity('O id da conta é obrigatório.')
		}

		const savedConta = await repository.get(input.id);

		if(!savedConta){
			return notFound();
		}

		const { usuario } = savedConta;

		validateConta(input);

		const { usuarioId, id, ...rest } = input;

		const editedConta: Conta = {
			...rest,
			id,
			tipo: rest.tipo === 'real' ? 'real' : 'simulador',
			usuario: usuario,
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
