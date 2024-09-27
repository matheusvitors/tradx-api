import { Repository, ResponseData } from "@/application/interfaces";
import { Conta, Operacao } from "@/core/models";
import { serverError, success, unprocessableEntity } from "@/infra/adapters/response-wrapper";
import { format } from "date-fns";

interface DashboardControllerParams {
	contaRepository: Repository<Conta>;
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
		const { contaRepository, operacaoRepository, contaId } = params;

		if(!contaId || contaId.length === 0) {
			return unprocessableEntity('A conta é obrigatória.');
		}

		const operacoes = await operacaoRepository.filter!([
			{field: 'contaId', value: contaId},
		]);

		let operacoesEmAberto: Operacao[] = [];
		const variacao: VariacaoInformation[] = [];
		let somatorioVariacao: number = 0;

		if(operacoes) {
			operacoesEmAberto = operacoes.filter(operacao => !operacao.precoSaida);
			const operacoesFechadas = operacoes.filter(operacao => operacao.precoSaida);

			operacoesFechadas
			.sort((a,b) => new Date(a.dataEntrada).getTime() - new Date(b.dataEntrada).getTime())
			.forEach(operacao => {
				const resultadoPontos =  operacao.precoSaida ? operacao.tipo === 'compra' ? operacao.precoEntrada - operacao.precoSaida : operacao.precoSaida - operacao.precoEntrada : 0;
				somatorioVariacao +=  (resultadoPontos * operacao.ativo.multiplicador) + (somatorioVariacao || 0);
				variacao.push({
					value: somatorioVariacao,
					label: new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(parseFloat(somatorioVariacao.toString())),
					data: format(operacao.dataEntrada, 'dd/MM/yyyy')
				});
			})
		}

		const contas = await contaRepository.list();

		return success({
			contas: contas || [],
			variacao,
			operacoes: operacoesEmAberto
		});

	} catch (error) {
		return serverError(error);
	}
}
