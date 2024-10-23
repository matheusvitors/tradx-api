import { Repository, ResponseData } from "@/application/interfaces";
import { calculateSaldoOfOperacao } from "@/application/usecases";
import { Conta, Operacao } from "@/core/models";
import { serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";
import { format } from "date-fns";

interface DashboardControllerParams {
	operacaoRepository: Repository<Operacao>;
	contaId: string;
}

interface VariacaoInformation {
	value: number;
	data: string;
	label: string;
}

//TODO: REfatorar essa para para que cada item tenha seu proprio endpoint
//TODO: Refatorar o item variação para constar tambem algumas informações da operacao

export const dashboardController = async (params: DashboardControllerParams): Promise<ResponseData> => {
	try {
		const { operacaoRepository, contaId } = params;

		if(!contaId || contaId.length === 0) {
			return unprocessableEntity('A conta é obrigatória.');
		}

		let initDate = new Date();
		let endDate = new Date();


		initDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
		endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
		if(process.env.NODE_ENV === 'test')  {
			initDate = new Date(new Date().getFullYear(), 7, 1);
			endDate = new Date(new Date().getFullYear(), 8, 0);
		}
		// initDate = format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd');
		// endDate = format(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), 'yyyy-MM-dd');

		// if(process.env.NODE_ENV === 'test')  {
		// 	initDate = format(new Date(new Date().getFullYear(), 7, 1), 'yyyy-MM-dd');
		// 	endDate = format(new Date(new Date().getFullYear(), 8, 0), 'yyyy-MM-dd');
		// }

		const operacoes = await operacaoRepository.filter!([
			{field: 'contaId', value: contaId},
			{field: 'dataEntrada', value: { gte: initDate, lte: endDate }}
		]);

		const conta = {
			saldo: 0,
			ganhos: 0,
			perdas: 0
		}
		let operacoesEmAberto: Operacao[] = [];
		const variacao: VariacaoInformation[] = [];
		let somatorioVariacao: number = 0;

		if(operacoes) {

			conta.saldo = operacoes.reduce((accumulator, operacao) => accumulator + calculateSaldoOfOperacao(operacao), 0);

			conta.ganhos = operacoes.reduce((accumulator, operacao) => {
				if(operacao.precoSaida) {
					let result = operacao.tipo === 'compra' ? operacao.precoSaida - operacao.precoEntrada : operacao.precoEntrada - operacao.precoSaida;
					return result > 0 ? accumulator + (result * operacao.ativo.multiplicador) : accumulator;
				}
				return accumulator;
			},0);

			conta.perdas = operacoes.reduce((accumulator, operacao) => {
				if(operacao.precoSaida) {
					let result = operacao.tipo === 'compra' ? operacao.precoSaida - operacao.precoEntrada : operacao.precoEntrada - operacao.precoSaida;
					return result < 0 ? accumulator - (result * operacao.ativo.multiplicador) : accumulator;
				}
				return accumulator;
			},0);

			operacoesEmAberto = operacoes.filter(operacao => !operacao.precoSaida);
			const operacoesFechadas = operacoes.filter(operacao => operacao.precoSaida);

			operacoesFechadas
			.sort((a,b) => new Date(a.dataEntrada).getTime() - new Date(b.dataEntrada).getTime())
			.forEach(operacao => {
				somatorioVariacao += calculateSaldoOfOperacao(operacao)

				variacao.push({
					value: somatorioVariacao,
					label: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(parseFloat(somatorioVariacao.toString())),
					data: format(operacao.dataEntrada, 'dd/MM/yyyy')
				});
			})
		}

		return success({
			conta,
			variacao,
			operacoes: operacoesEmAberto
		});

	} catch (error) {
		return serverError(error);
	}
}
