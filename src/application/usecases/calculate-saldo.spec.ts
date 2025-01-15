import { calculateSaldo } from "@/application/usecases/calculate-saldo";
import { describe, expect, it } from "vitest";

describe('Calculate Saldo', () => {
	it('should calculate saldo of success operacao with type compra', () => {
		const saldo = calculateSaldo({
			tipo: 'compra',
			previousSaldo: 50,
			precoEntrada: 100,
			precoSaida: 200,
			multiplicador: 2
		});
		expect(saldo).toEqual(250)
	});

	it('should return 0 if precoEntrada = precoSaida', () => {
		const saldo = calculateSaldo({
			tipo: 'compra',
			previousSaldo: 50,
			precoEntrada: 100,
			precoSaida: 100,
			multiplicador: 2
		});
		expect(saldo).toEqual(0)
	});

	it('should calculate saldo of failed operacao with type compra', () => {
		const saldo = calculateSaldo({
			tipo: 'compra',
			previousSaldo: 50,
			precoEntrada: 100,
			precoSaida: 50,
			multiplicador: 2
		});
		expect(saldo).toEqual(-50)
	});

	it('should calculate saldo of success operacao with type venda', () => {
		const saldo = calculateSaldo({
			tipo: 'venda',
			previousSaldo: 150,
			precoEntrada: 200,
			precoSaida: 100,
			multiplicador: 2
		});
		expect(saldo).toEqual(350)
	});


	it('should calculate saldo of failed operacao with type venda', () => {
		const saldo = calculateSaldo({
			tipo: 'venda',
			previousSaldo: 50,
			precoEntrada: 100,
			precoSaida: 200,
			multiplicador: 2
		});
		expect(saldo).toEqual(-150)
	});

});
