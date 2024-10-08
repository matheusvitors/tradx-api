import { AtivoDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { ativoTypes } from "@/core/models";

export const validateAtivo = (ativo: Partial<AtivoDTO>) => {
	if(!ativo.id) {
		throw new ValidationError('Id inexistente.')
	}

	if(!ativo.nome || ativo.nome.length < 2) {
		throw new ValidationError('Nome do ativo deve conter pelo menos 2 caracteres.');
	}

	if(!ativo.acronimo || ativo.acronimo.length < 3) {
		throw new ValidationError('O acronimo deve conter pelo menos 3 caracteres.');
	}

	if(!ativo.tipo || !ativoTypes.includes(ativo.tipo)) {
		throw new ValidationError('O ativo deverá ter o tipo índice ou ação.');
	}

	if(!ativo.multiplicador || ativo.multiplicador < 0) {
		throw new ValidationError('O multiplicador deve ser maior que zero.');
	}


}
