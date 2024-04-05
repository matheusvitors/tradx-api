import { Repository, ResponseData } from "@/application/interfaces";
import { Usuario } from "@/core/models";
import { serverError, success } from "@/infra/adapters/response-wrapper";

interface GetUsuarioControllerParams {
	repository: Repository<Usuario>;
	id: string;
}

export const getUsuarioController = async (params: GetUsuarioControllerParams): Promise<ResponseData> => {
	try {
		const { repository, id } = params;
		const usuario = await repository.get(id);
		return success({usuario});
	} catch (error) {
		return serverError(error);
	}
}
