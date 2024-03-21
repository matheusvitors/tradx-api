import { Repository, ResponseData } from "@/application/interfaces";
import { Operacao } from "@/core/models";
import { get, remove } from "@/core/usecases/persist";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface RemoveOperacaoControllerParams {
	repository: Repository<Operacao>;
	id: string;
}

export const removeOperacaoController = async (params: RemoveOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const { id, repository } = params;

		const operacao = await repository.get(id);

		if(!operacao) {
			return notFound();
		}

		await repository.remove(id);
		return success();
	} catch (error) {
		return serverError(error)
	}
}
