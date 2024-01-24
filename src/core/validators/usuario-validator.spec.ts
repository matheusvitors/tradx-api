import { ValidationError } from "@/application/errors";
import { usuarioValidator } from "@/core/validators/usuario-validator";
import { describe, expect, it } from "vitest";

describe('Usuario Validator', () => {
	it('should validate a usuario', () => {
		const input = {
			id: 'abc',
			nome: 'Teste',
			username: 'teste',
			password: '123',
			email: 'teste@teste.com'
		}

		expect(() => usuarioValidator(input)).not.toThrow();
	});

	it('should not validate if usuario name is below 2 caracters', () => {
		const input = {
			id: 'abc',
			nome: 't',
			username: 'teste',
			password: '123',
			email: 'teste@teste.com'
		}

		expect(() => usuarioValidator(input)).toThrow(ValidationError);
	});

	it('should not validate if usuario username is below 3 caracters', () => {
		const input = {
			id: 'abc',
			nome: 'teste',
			username: 't',
			password: '123',
			email: 'teste@teste.com'
		}

		expect(() => usuarioValidator(input)).toThrow(ValidationError);
	});

	it('should not validate if usuario username is below 3 caracters', () => {
		const input = {
			id: 'abc',
			nome: 'teste',
			username: 'teste',
			password: '1',
			email: 'teste@teste.com'
		}

		expect(() => usuarioValidator(input)).toThrow(ValidationError);
	});

	it('should not validate if usuario email is invalid', () => {
		const input = {
			id: 'abc',
			nome: 'teste',
			username: 'teste',
			password: '123',
			email: 'teste'
		}

		expect(() => usuarioValidator(input)).toThrow(ValidationError);
	});

});
