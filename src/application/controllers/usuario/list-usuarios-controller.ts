import { Repository, ResponseData } from "@/core/interfaces";
import { Usuario } from "@/core/models";
import { list } from "@/core/usecases/persist";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const listUsuariosController = async (repository: Repository<Usuario>): Promise<ResponseData> => {
	try {
		const usuarios = await list<Usuario>(repository);
		return success({usuarios});
	} catch (error) {
		return serverError(error);
	}
}
