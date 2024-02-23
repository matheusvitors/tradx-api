import { Repository, ResponseData } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { get } from "@/core/usecases/persist";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface GetOperacaoControllerParams {
	repository: Repository<Operacao>;
	id: string;
}

export const getOperacaoController = async (params: GetOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const operacao = await get<Operacao>(params);

		if(!operacao) {
			return notFound();
		}

		return success(operacao);
	} catch (error) {
		return serverError(error)
	}
}
