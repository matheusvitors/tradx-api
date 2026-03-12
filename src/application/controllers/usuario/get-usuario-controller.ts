import { Repository, ResponseData } from "@/application/interfaces";
import { Usuario } from "@/core/models";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper";

interface GetUsuarioControllerParams {
	repository: Repository<Usuario>;
	id: string;
}

export const getUsuarioController = async (params: GetUsuarioControllerParams): Promise<ResponseData> => {
	try {
		const { repository, id } = params;

		const usuario = await repository.get(id);

		if(!usuario) {
			return notFound();
		}
		return success({usuario});
	} catch (error) {
		console.error(error);
		return serverError(error);
	}
}
