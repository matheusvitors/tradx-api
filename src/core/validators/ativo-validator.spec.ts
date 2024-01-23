import { ValidationError } from '@/application/errors';
import { Ativo } from '@/core/models';
import { validateAtivo } from '@/core/validators/ativo-validator';
import { it, expect, describe } from 'vitest';

describe('Ativo Validator', () => {
	it('should validate a ativo', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'Teste',
			acronimo: 'TSTE1',
			tipo: 'indice'
		}

		expect(() => validateAtivo(input)).not.toThrow();
	});

	it('should throw error if id not exist', () => {
		const input: Omit<Ativo, 'id'> = {
			nome: 'Teste',
			acronimo: 'TSTE1',
			tipo: 'indice'
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});

	it('should throw error if name is invalid', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'T',
			acronimo: 'TSTE1',
			tipo: 'indice'
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});

	it('should throw error if acronimo is invalid', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'Teste',
			acronimo: 'TS',
			tipo: 'indice'
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});


	it('should throw error if tipo is invalid', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'Teste',
			acronimo: 'TSTE1',
			//@ts-ignore
			tipo: 'other'
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});

});
