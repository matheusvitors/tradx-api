import { Repository, ResponseData } from "@/application/interfaces";
import { Usuario } from "@/core/models";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listUsuariosController = async (repository: Repository<Usuario>): Promise<ResponseData> => {
	try {
		const usuarios = await repository.list()
		return success({usuarios});
	} catch (error) {
		return serverError(error);
	}
}
