import { Repository, ResponseData } from "@/core/interfaces";
import { Operacao } from "@/core/models";
import { get, remove } from "@/core/usecases/persist";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";

interface RemoveOperacaoControllerParams {
	repository: Repository<Operacao>;
	id: string;
}

export const removeOperacaoController = async ({ id, repository }: RemoveOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const operacao = await get<Operacao>({id, repository});

		if(!operacao) {
			return notFound();
		}

		await remove<Operacao>({ repository, id });
		return success();
	} catch (error) {
		return serverError(error)
	}
}
