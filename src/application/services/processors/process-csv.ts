import { OperacaoDTO } from "@/application/dto";
import { Repository } from "@/application/interfaces";
import { Ativo, Conta } from "@/core/models";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { unprocessableEntity } from "@/infra/adapters/response-wrapper";
import { toValidDate } from "@/utils/to-valid-date";

interface ProcessCsvParams {
	row: any;
	reject: (value: unknown) => void;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
}

export const processCsv = async ({row, reject, ativoRepository, contaRepository}: ProcessCsvParams) => {
	try {
		const ativo = await ativoRepository.find!('acronimo', row.ativo);

		if(!ativo) {
			reject(unprocessableEntity('Ativo não encontrado.'));
			return;
		}

		const conta = await contaRepository.find!('nome', row.conta);

		if(!conta) {
			reject(unprocessableEntity('Conta não encontrada.'));
			return;
		}

		const operacao: OperacaoDTO = {
			id: newID(),
			ativoId: ativo.id,
			contaId: conta.id,
			quantidade: parseInt(row.quantidade),
			tipo: row.tipo.toLowerCase(),
			precoEntrada: parseFloat(row.precoEntrada),
			stopLoss: parseFloat(row.stopLoss),
			alvo: parseFloat(row.alvo),
			precoSaida: parseFloat(row.precoSaida),
			dataEntrada: toValidDate(row.dataEntrada),
			dataSaida: row.dataSaida ? toValidDate(row.dataSaida) : undefined,
			margem: 0,
			operacaoPerdida: row.operacaoPerdida === 'false' ? false : true,
			operacaoErrada: row.operacaoErrada === 'false' ? false : true,
			comentarios: row.comentarios,
			motivo: row.motivo
		};

		validateOperacao(operacao);
		return operacao;
	} catch (error) {
		reject(error)
	}
}
