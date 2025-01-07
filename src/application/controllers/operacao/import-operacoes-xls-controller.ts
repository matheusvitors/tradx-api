import { existsSync } from "fs";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo, Conta, Operacao } from "@/core/models";
import { notFound, serverError, success } from "@/infra/adapters/response-wrapper"
import { xls } from "@/infra/adapters/xlsx";
import { OperacaoDTO } from "@/application/dto";
import { newID } from "@/infra/adapters/newID";
import { format } from "date-fns";

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

		let data: OperacaoDTO[] = []

		for (let i = 0; i < sheets.length; i++) {
			const temp = xls.json(
				contentFile.Sheets[contentFile.SheetNames[i]]
			);



			temp.forEach((x: any) => {
				const splitDate = x['Data'].split('/');
				const splitHoraEntrada = x['Horario - Entrada'].split(':')
				const splitHoraSaida = x['Horario - Saída'].split(':')
				const horarioEntrada = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitHoraEntrada[0]}:${splitHoraEntrada[1]}`
				const horarioSaida = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitHoraSaida[0]}:${splitHoraSaida[1]}`

				console.log({
					data: x['Data'],
					contratos: x['Contratos'],
					ativo: x['Ativo'],
					tipo: x['Tipo'],
					entrada: x['Entrada'],
					stopLoss: x['Stop Loss'],
					alvo: x['Alvo'],
					saida: x['Saída'],
					horarioEntrada: x['Horario - Entrada'],
					horarioSaida: x['Horario - Saída'],
					operacaoPerdida: x['Operação Perdida?'],
					erro: x['Erro?'],
					comentario: x['Comentário'] ?? ''
				});

				data.push({
					id: newID(),
					ativoId: "",
					contaId: "",
					quantidade: parseInt(x['Contratos']),
					tipo: x['Tipo'] === 'Compra' ? 'compra' : 'venda',
					precoEntrada: parseInt(x['Entrada']),
					stopLoss: parseInt(x['Stop Loss']),
					alvo: parseInt(x['Alvo']),
					precoSaida: parseInt(x['Saída']),
					dataEntrada: new Date(horarioEntrada),
					dataSaida: new Date(horarioSaida),
					operacaoPerdida: x['Operação Perdida?'] === 'TRUE'? true : false,
					operacaoErrada: x['Erro?'] === 'TRUE'? true : false,
					comentarios: x['Comentário'] ?? ''
				});
			});
		}

		console.log(data);

		return success();

	} catch (error) {
		operacaoRepository.rollback && operacaoRepository.rollback();
		console.error(error)
		return serverError(error);
	}
}
