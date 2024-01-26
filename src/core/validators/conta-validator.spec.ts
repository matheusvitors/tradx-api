import { ValidationError } from "@/application/errors";
import { validateConta } from "@/core/validators/conta-validator";
import { describe, expect, it } from "vitest";

describe('Usuario Validator', () => {
	it('should validate a usuario', () => {
		const input = {
			id: 'abc',
			nome: 'teste',
			tipo: 'simulador',
			usuarioId: 'efg'
		}

		expect(() => validateConta(input)).not.toThrow();
	})

	it('should not validate if nome length is below 3 caracteres', () => {
		const input = {
			id: 'abc',
			nome: 't',
			tipo: 'simulador',
			usuarioId: 'efg'
		}

		expect(() => validateConta(input)).toThrow(ValidationError);
	})

	it('should not validate if tipo is invalid', () => {
		const input = {
			id: 'abc',
			nome: 'teste',
			tipo: 'outro',
			usuarioId: 'efg'
		}

		expect(() => validateConta(input)).toThrow(ValidationError);
	})

	it('should not validate if not have user or userid', () => {
		const input = {
			id: 'abc',
			nome: 'teste',
			tipo: 'outro',
		}

		// @ts-ignore
		expect(() => validateConta(input)).toThrow(ValidationError);
	})
});
