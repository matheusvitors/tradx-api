import { Repository, ResponseData } from "@/application/interfaces";
import { updateSaldo } from "@/application/usecases/operacao";
import { Conta, Operacao } from "@/core/models";
import { notFound, success, serverError } from "@/infra/adapters/response-wrapper";
import { toOperacaoDto } from "@/utils/transforms";

interface RemoveOperacaoControllerParams {
	operacaoRepository: Repository<Operacao>;
	contaRepository: Repository<Conta>;
	id: string;
}

export const removeOperacaoController = async (params: RemoveOperacaoControllerParams): Promise<ResponseData> => {
	try {
		const { id, operacaoRepository, contaRepository } = params;

		const operacao = await operacaoRepository.get(id);

		if(!operacao) {
			return notFound();
		}

		await operacaoRepository.remove(id);

		await updateSaldo({
			operacao: toOperacaoDto(operacao),
			conta: operacao.conta,
			contaRepository,
			ativo: operacao.ativo,
			isRemoving: true
		})

		return success();
	} catch (error) {
		return serverError(error)
	}
}
