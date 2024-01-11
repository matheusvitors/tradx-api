import { Repository, ResponseData } from "@/core/interfaces";
import { Ativo } from "@/core/models";
import { list } from "@/core/usecases/persist";
import { success } from "@/infra/adapters/response-wrapper";

export const listAtivosController = async (repository: Repository<Ativo>): Promise<ResponseData> => {
	const ativos = await list<Ativo>(repository);
	return success(ativos);
}
