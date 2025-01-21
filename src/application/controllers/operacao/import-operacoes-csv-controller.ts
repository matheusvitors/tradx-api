import { createReadStream, existsSync, unlinkSync } from "fs";
import { OperacaoDTO } from "@/application/dto";
import { Repository, ResponseData } from "@/application/interfaces";
import { validateOperacoesCsv } from "@/application/usecases/operacao";
import { Ativo, Conta, Operacao } from "@/core/models";
import { csv } from "@/infra/adapters/csv";
import { unprocessableEntity, serverError, notFound, success } from "@/infra/adapters/response-wrapper";
import { validateOperacao } from "@/core/validators";
import { newID } from "@/infra/adapters/newID";
import { toValidDate } from "@/utils/to-valid-date";
import { NODE_ENV } from "@/infra/config/environment";
import { ValidationError } from "@/application/errors";
import { calculateSaldo } from "@/application/usecases";

interface importOperacoesByCsvControllerParams {
	operacaoRepository: Repository<Operacao>;
	ativoRepository: Repository<Ativo>;
	contaRepository: Repository<Conta>;
	contaId: string;
	file: string;
}

//TODO: Fazer o rollback caso haja algum erro de ativo ou conta invalida

export const importOperacoesByCsvController = async (params: importOperacoesByCsvControllerParams): Promise<ResponseData> => {
	const { operacaoRepository, ativoRepository, contaRepository, contaId, file } = params;
	try {
		const operacoesToSave: OperacaoDTO[] = [];

		if(!existsSync(file)) {
			return notFound('Arquivo não encontrado no servidor.');
		}

		let conta = await contaRepository.get(contaId);

		if(!contaId || !conta || contaId.length === 0) {
			throw notFound('Conta não encontrada.');
		}

		const ativos = await ativoRepository.list();
		let newSaldo = conta.saldo;


		const processRow = async (row: any, reject: (value: unknown) => void) => {
			try {
				const ativo = ativos.find(ativo => ativo.acronimo === row['Ativo'])

				if(!ativo) {
					reject(unprocessableEntity('Ativo não encontrado.'));
					return;
				}

				const dateRegex = new RegExp(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/);

				if(!dateRegex.test(row['Data'])) {
					reject(unprocessableEntity('Formato de data inválida.'))
				}

				const splitDate = row['Data'].split('/');
				const splitHoraEntrada = row['Horario - Entrada'].split(':')
				const splitHoraSaida = row['Horario - Saída'].split(':')
				const horarioEntrada = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitHoraEntrada[0]}:${splitHoraEntrada[1]}`
				const horarioSaida = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]} ${splitHoraSaida[0]}:${splitHoraSaida[1]}`


				const operacao: OperacaoDTO = {
					id: newID(),
					ativoId: ativo.id,
					contaId: conta.id,
					quantidade: parseInt(row['Contratos']),
					tipo: row['Tipo'] === 'Compra' ? 'compra' : 'venda',
					precoEntrada: parseInt(row['Entrada']),
					stopLoss: parseInt(row['Stop Loss']),
					alvo: parseInt(row['Alvo']),
					precoSaida: parseInt(row['Saída']),
					dataEntrada: new Date(horarioEntrada),
					dataSaida: new Date(horarioSaida),
					operacaoPerdida: row['Operação Perdida?'] === 'TRUE'? true : false,
					operacaoErrada: row['Erro?'] === 'TRUE'? true : false,
					comentarios: row['Comentário'] ?? ''

				};

				validateOperacao(operacao);

				if(operacao.precoSaida){
					const saldo = calculateSaldo({
						tipo: operacao.tipo === 'compra' ? 'compra' : 'venda',
						previousSaldo: newSaldo,
						precoEntrada: operacao.precoEntrada,
						precoSaida: operacao.precoSaida,
						multiplicador: ativo.multiplicador
					})
					newSaldo = saldo !== 0 ? saldo : newSaldo;

				}

				operacoesToSave.push(operacao);
			} catch (error) {
				reject(error)
			}
		}

		const promises: Promise<void>[] = [];

		await new Promise((resolve, reject) => {
			createReadStream(file)
			.pipe(csv.parse())
			.on('data', row => promises.push(processRow(row, reject)))
			.on('error', async (error) => {
				console.error('process csv error',error);
				reject(error)
			})
			.on('end', async () => {
				await Promise.all(promises);
				resolve(true);
			});
		})

		await operacaoRepository.batchCreation!(operacoesToSave);
		await contaRepository.edit({...conta, saldo: newSaldo});


		return success();
	} catch (error: any) {
		console.error(error)
		operacaoRepository.rollback && operacaoRepository.rollback();
		if(error instanceof ValidationError) {
			return unprocessableEntity(error.message);
		}
		if("status" in error) {
			return error;
		}

		return serverError(error);

	} finally {
		NODE_ENV !== "test" && unlinkSync(file);
	}
}
