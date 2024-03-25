import { OperacaoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { Operacao, operacaoTypes } from "@/core/models";

export const validateOperacao = (operacao: Operacao | OperacaoDTO) => {

	const availableTipos: Array<string> = operacaoTypes.map(tipo => tipo);

	if(!availableTipos.includes(operacao.tipo)) {
		throw new ValidationError("O tipo deve ser compra ou venda.");
	}

	if(operacao.quantidade < 0) {
		throw new ValidationError("Quantidade não pode ter valor negativo.");
	}

	if(operacao.precoEntrada < 0 ||
		(operacao.precoSaida && operacao.precoSaida < 0) ||
		operacao.stopLoss < 0 ||
		operacao.alvo < 0
	) {
		throw new ValidationError("Preço não pode ter valor negativo.");
	}

	if(operacao.dataSaida && operacao.dataSaida < operacao.dataEntrada){
		throw new ValidationError("Data de saída não pode ser anterior a data de entrada");
	}

	if(operacao.margem && operacao.margem < 0){
		throw new ValidationError("Margem não pode ter valor negativo.");
	}
}
