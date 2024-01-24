import { OperacaoDTO } from '@/application/dto';
import { ValidationError } from '@/application/errors';
import { validateOperacao } from '@/core/validators/operacao-validator';
import { it, expect, describe } from 'vitest';


describe('Operacao Validator', () => {

	it('should validate a operacao with full information', () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 1,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			precoSaida: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			dataSaida: new Date('23/01/2024, 16:00:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		expect(() => validateOperacao(input)).not.toThrow();
	});

	it('should validate a operacao with [entrada]', () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 1,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		expect(() => validateOperacao(input)).not.toThrow();
	});

	it('should not validate if quantidade is negative', () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: -10,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		expect(() => validateOperacao(input)).toThrow(ValidationError);
	});

	it('should not validate if price is negative', () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'compra',
			precoEntrada: 10,
			precoSaida: -10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		const input2: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'compra',
			precoEntrada: -10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};
		const input3: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: -5,
			alvo: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		const input4: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: -20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		const input5: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('23/01/2024, 15:45:00'),
			margem: -10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		expect(() => validateOperacao(input)).toThrow(ValidationError);
		expect(() => validateOperacao(input2)).toThrow(ValidationError);
		expect(() => validateOperacao(input3)).toThrow(ValidationError);
		expect(() => validateOperacao(input4)).toThrow(ValidationError);
		expect(() => validateOperacao(input5)).toThrow(ValidationError);
	});

	it('should not validate if dataSaida is before dataEntrada', () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'compra',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('2024-01-23 15:45:00'),
			dataSaida: new Date('2024-01-22 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		expect(() => validateOperacao(input)).toThrow(ValidationError);
	});

	it('should not validate if tipo is wrong', () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: '123',
			quantidade: 10,
			tipo: 'nada',
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('2024-01-23 15:45:00'),
			dataSaida: new Date('2024-01-24 15:45:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		};

		expect(() => validateOperacao(input)).toThrow(ValidationError);
	});
});
