import { Repository, ResponseData } from "@/core/interfaces";
import { Usuario } from "@/core/models";
import { get } from "@/core/usecases/persist";
import { serverError, success } from "@/infra/adapters/response-wrapper";

interface GetUsuarioControllerParams {
	repository: Repository<Usuario>;
	id: string;
}

export const getUsuarioController = async (params: GetUsuarioControllerParams): Promise<ResponseData> => {
	try {
		const usuario = await get<Usuario>(params);
		return success({usuario});
	} catch (error) {
		return serverError(error);
	}
}
