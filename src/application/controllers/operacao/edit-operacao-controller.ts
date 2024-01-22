import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/core/interfaces";
import { Operacao } from "@/core/models";
import { edit, get } from "@/core/usecases/persist";
import { validateOperacao } from "@/core/validators";
import { notFound, success, unprocessableEntity, serverError } from "@/infra/adapters/response-wrapper";

interface EditOperacaoControllerParams {
	repository: Repository<Operacao>;
	input: OperacaoDTO;
}

export const editOperacaoController = async ({ repository, input }: EditOperacaoControllerParams): Promise<ResponseData> => {

	try {
		validateOperacao(input);

		const operacao = await get<Operacao>({repository, id:input.id});
		if(!operacao) {
			return notFound();
		}
		console.log('operacao', operacao);

		const editedOperacao = await repository.edit(input);
		return success({ operacao: editedOperacao});

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}
}
