import { ValidationError } from "@/application/errors";
import { Ativo } from "@/core/models";

export const validateAtivo = (ativo: Partial<Ativo>) => {
	if(!ativo.id) {
		throw new ValidationError('Id inexistente.')
	}

	if(!ativo.nome || ativo.nome.length < 2) {
		throw new ValidationError('Nome do ativo deve conter pelo menos 2 caracteres.');
	}

	if(!ativo.acronimo || ativo.acronimo.length < 3) {
		throw new ValidationError('O acronimo deve conter pelo menos 3 caracteres.');
	}
}
