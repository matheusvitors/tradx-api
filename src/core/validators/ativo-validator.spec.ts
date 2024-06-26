import { it, expect, describe } from 'vitest';
import { ValidationError } from '@/application/errors';
import { Ativo } from '@/core/models';
import { validateAtivo } from '@/core/validators/ativo-validator';

describe('Ativo Validator', () => {
	it('should validate a ativo', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'Teste',
			acronimo: 'TSTE1',
			tipo: 'indice',
			multiplicador: 1,
		}

		expect(() => validateAtivo(input)).not.toThrow();
	});

	it('should throw error if id not exist', () => {
		const input: Omit<Ativo, 'id'> = {
			nome: 'Teste',
			acronimo: 'TSTE1',
			tipo: 'indice',
			multiplicador: 1,
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});

	it('should throw error if name is invalid', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'T',
			acronimo: 'TSTE1',
			tipo: 'indice',
			multiplicador: 1,
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});

	it('should throw error if acronimo is invalid', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'Teste',
			acronimo: 'TS',
			tipo: 'indice',
			multiplicador: 1,
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

	it('should throw error if multiplicador is above 0', () => {
		const input: Ativo = {
			id: 'abc',
			nome: 'Teste',
			acronimo: 'TSTE1',
			tipo: 'indice',
			multiplicador: -1,
		}

		expect(() => validateAtivo(input)).toThrow(ValidationError);
	});

});
