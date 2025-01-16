import { existsSync, unlinkSync } from "fs";
import { Repository, ResponseData } from "@/application/interfaces";
import { Ativo, Conta, Operacao } from "@/core/models";
import { notFound, serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper"
import { xls } from "@/infra/adapters/xlsx";
import { OperacaoDTO } from "@/application/dto";
import { newID } from "@/infra/adapters/newID";
import { format } from "date-fns";
import { validateOperacao } from "@/core/validators";
import { ValidationError } from "@/application/errors";
import { NODE_ENV } from "@/infra/config/environment";
import { calculateSaldo } from "@/application/usecases";

interface ImportOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	contaId: string;
	file: string;
}

export const importOperacoesByXlsController = async (params: ImportOperacoesByCsvControllerParams): Promise<ResponseData> => {
	try {
		const { operacaoRepository, ativoRepository, contaRepository, contaId, file } = params;

		if(!existsSync(file)) {
			return notFound('Arquivo não encontrado no servidor.');
		}

		let conta = await contaRepository.get(contaId);

		if(!contaId || !conta || contaId.length === 0) {
			throw notFound('Conta não encontrada.')
		}

		const contentFile = xls.read(file);
		const sheets = contentFile.SheetNames;

		const ativos = await ativoRepository.list();
		let data: OperacaoDTO[] = [];
		let newSaldo = conta.saldo;

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

				const ativo = ativos.find(ativo => ativo.acronimo === x['Ativo']);

				if(!ativo) {
					throw unprocessableEntity('Há ativos inexistentes no arquivo enviado.')
				}


				const operacao: OperacaoDTO = {
					id: newID(),
					ativoId: ativo.id,
					contaId,
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
				}

				validateOperacao(operacao);

				if(operacao.precoSaida){
					const saldo = calculateSaldo({
						tipo: operacao.tipo === 'compra' ? 'compra' : 'venda',
						previousSaldo: newSaldo,
						precoEntrada: operacao.precoEntrada,
						precoSaida: operacao.precoSaida,
						multiplicador: ativo.multiplicador
					})
					newSaldo = saldo !== 0 ? saldo : newSaldo ;
				}

				data.push(operacao);
			});
		}

		operacaoRepository.batchCreation!(data);
		await contaRepository.edit({...conta, saldo: newSaldo});

		NODE_ENV !== "test" && unlinkSync(file);

		return success();

	} catch (error: any) {
		params.operacaoRepository.rollback && params.operacaoRepository.rollback();
		console.error(error);
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		if("status" in error) {
			return error;
		}

		return serverError(error);
	}
}
