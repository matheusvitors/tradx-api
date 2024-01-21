import { Repository, ResponseData } from "@/core/interfaces";
import { Operacao } from "@/core/models";
import { get } from "@/core/usecases/persist";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface GetOperacaoControllerParams {
	repository: Repository<Operacao>;
	id: string;
}

export const getOperacaoController = async ({ id, repository }: GetOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const operacao = await get<Operacao>({id, repository});

		if(!operacao) {
			return notFound();
		}

		return success(operacao);
	} catch (error) {
		return serverError(error)
	}
}
