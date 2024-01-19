import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Repository, ResponseData } from "@/core/interfaces";
import { Operacao } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { success, unprocessableEntity, serverError } from "@/infra/adapters/response-wrapper";

interface CreateOperacaoControllerParams {
	repository: Repository<Operacao>;
	input: Omit<OperacaoDTO, 'id'>
}

export const createOperacaoController = async ({ repository, input }: CreateOperacaoControllerParams): Promise<ResponseData> => {
	try {

		const operacao: OperacaoDTO = {
			id: newID(),
			ativoId: input.ativoId,
			quantidade: input.quantidade,
			tipo: input.tipo,
			precoEntrada: input.precoEntrada,
			stopLoss: input.stopLoss,
			alvo: input.alvo,
			precoSaida: input.precoSaida,
			dataEntrada: new Date(input.dataEntrada),
			dataSaida: input.dataSaida ? new Date(input.dataSaida): undefined,
			margem: input.margem,
			operacaoPerdida: input.operacaoPerdida,
			operacaoErrada: input.operacaoErrada
		};

		console.log(operacao);
		validateOperacao(operacao);

		await repository.create(operacao);
		return success(operacao);

	} catch (error) {
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		return serverError(error);
	}

}