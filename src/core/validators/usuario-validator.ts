import { ValidationError } from "@/application/errors";
import { Usuario } from "@/core/models";

export const usuarioValidator = (input: Usuario) => {

	if(input.nome.length < 3) {
		throw new ValidationError("O nome deve ter 3 ou mais caracteres.")
	}

	if(input.username.length < 3) {
		throw new ValidationError("O username deve ter 3 ou mais caracteres.")
	}

	if(input.password.length < 3) {
		throw new ValidationError("A senha deve ter 3 ou mais caracteres.")
	}

	if(!new RegExp('^((?!\\.)[\\w\\-_.]*)(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$').test(input.email)){
		throw new ValidationError("O e-mail deve ser válido.")

	}
}
