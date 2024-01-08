import { ValidationError } from "@/application/errors";
import { Ativo } from "@/core/models";

export const validateAtivo = (ativo: Ativo) => {
	if(ativo.nome.length < 2) {
		throw new ValidationError('Nome do ativo deve conter pelo menos 2 caracteres.');
	}

	if(ativo.acronimo.length < 3) {
		throw new ValidationError('O acronimo deve conter pelo menos 3 caracteres.');
	}
}
