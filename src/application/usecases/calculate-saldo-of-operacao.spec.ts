import { calculateSaldoOfOperacao } from "@/application/usecases/calculate-saldo-of-operacao";
import { Operacao } from "@/core/models";
import { describe, expect, it } from "vitest";

describe('Calculate saldo of operacao', () => {
	const operacao: Operacao = {
		id: "01917ba5-42f3-7379-8391-4bdbb1cea814",
		ativo: {
			id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
			nome: "Mais uma",
			acronimo: "MAUM1",
			tipo: "indice",
			multiplicador: 4.5,
		},
		contaId: 'abc',
		conta: {
			id: "abc",
			nome: "Simulador",
			tipo: "simulador",
			usuario: {
				id: '101',
				nome: "João Silva",
				email: "joao.silva@example.com",
				username: "a",
				password: "1",
			},
			saldo: 3073,
			saldoInicial: 0,
		},
		quantidade: 1,
		tipo: "compra",
		precoEntrada: 10,
		stopLoss: 5,
		alvo: 20,
		precoSaida: 20,
		dataEntrada: new Date( "2024-08-22 14:50"),
		dataSaida: new Date("2024-08-22 15:50"),
		margem: 20,
		operacaoPerdida: false,
		operacaoErrada: false,
	}

	it('should calculate the balance of operacao', () => {
		expect(calculateSaldoOfOperacao(operacao)).toEqual(45);
	});

	it('should return 0 if precoSaida is undefined', () => {
		operacao.precoSaida = undefined;
		// expect(() => calculateSaldoOfOperacao(operacao)).toThrow(Error);
		expect(calculateSaldoOfOperacao(operacao)).toEqual(0);
	});

});
