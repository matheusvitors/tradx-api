import { existsSync } from "fs";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo, Conta, Operacao } from "@/core/models";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper"
import { xls } from "@/infra/adapters/xlsx";

interface ImportOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	file: string;
}

export const importOperacoesByXlsController = async (params: ImportOperacoesByCsvControllerParams): Promise<ResponseData> => {
	const { operacaoRepository, ativoRepository, contaRepository, file } = params;
	try {

		if(!existsSync(file)) {
			return notFound('Arquivo não encontrado no servidor.');
		}

		const contentFile = xls.read(file);

		const sheets = contentFile.SheetNames;

		let data = []

		for (let i = 0; i < sheets.length; i++) {
			const temp = xls.json(
				contentFile.Sheets[contentFile.SheetNames[i]]
			);
			temp.forEach((res) => {
				data.push(res);
			});
		}


		return success();

	} catch (error) {
		operacaoRepository.rollback && operacaoRepository.rollback();
		return serverError(error);
	}
}
