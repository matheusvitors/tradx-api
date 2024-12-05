import { Repository } from "@/application/interfaces";
import { Ativo, Conta, Operacao } from "@/core/models";
import { serverError } from "@/infra/adapters/response-wrapper"

interface ImportOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	file: string;
}

export const importOperacoesByXlsController = async (params: ImportOperacoesByCsvControllerParams) => {
	try {

	} catch (error) {

	}

	return serverError(null);
}
