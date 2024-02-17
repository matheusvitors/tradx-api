import { ContaDTO } from "@/application/dto";
import { ValidationError } from "@/application/errors";
import { contaTypes } from "@/core/models";

export const validateConta = (input: ContaDTO) => {

	const availableTipos: Array<string> = contaTypes.map(tipo => tipo);

	if(input.nome.length < 3) {
		throw new ValidationError('O nome deve ter pelo menos 3 caracteres')
	}

	if(!availableTipos.includes(input.tipo)) {
		throw new ValidationError('O tipo deve ser real ou simulador');
	}

	if(input.usuarioId === undefined) {
		throw new ValidationError('O id do usuário está vazio.');
	}
}
