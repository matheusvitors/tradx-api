import { ContaDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository } from "@/core/interfaces";
import { Conta } from "@/core/models";
import { edit, get } from "@/core/usecases/persist";
import { validateConta } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { success, unprocessableEntity, serverError, notFound } from "@/infra/adapters/response-wrapper";

interface EditContaControllerParams {
	repository: Repository<Conta>;
	data: ContaDTO;
}

export const editContaController = async (params: EditContaControllerParams) => {
	try {
		const { data, repository } = params;

		const savedConta = await get<Conta>({repository, id: data.id});

		if(!savedConta){
			return notFound();
		}

		validateConta(data);

		const conta = await edit<Conta>({repository, data});

		return success({conta});
	} catch (error: any) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
