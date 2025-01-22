import { getOperacaoController, removeOperacaoController } from "@/application/controllers/operacao";
import { Ativo, Conta, Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Remove Operacao Controller', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const contaRepository = new InMemoryRepository<Conta>();
	const ativoRepository = new InMemoryRepository<Ativo>();

	beforeAll(() => {

		ativoRepository.create({
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "indice",
			multiplicador: 2,
			dataVencimento: '2026-01-01',
		})

		contaRepository.create({
			id: '123',
			nome: 'teste',
			tipo: "simulador",
			usuarioId: 'xyz',
			saldoInicial: 0.00,
			saldo: 100.00
		})

		operacaoRepository.create({
			id: "abc",
			ativo: {
				id: "abc",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
				multiplicador: 2,
				dataVencimento: '2026-01-01',
			},
			contaId: 'aaa',
			conta: {
				id: '123',
				nome: 'teste',
				tipo: "simulador",
				usuarioId: 'xyz',
				saldoInicial: 0.00,
				saldo: 100.00,
				usuario: {
					id: "abc",
					nome: "Teste",
					username: "teste",
					password: "123",
					email: "teste@teste.com",
				},
			},
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			precoSaida: 20,
			dataEntrada: new Date('2024-03-14 15:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});

		operacaoRepository.create({
			id: "cde",
			ativo: {
				id: "abc",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
				multiplicador: 2,
				dataVencimento: '2026-01-01',
			},
			contaId: 'bbb',
			conta: {
				id: '123',
				nome: 'teste',
				tipo: "simulador",
				usuarioId: 'xyz',
				saldoInicial: 0.00,
				saldo: 100.00,
				usuario: {
					id: "abc",
					nome: "Teste",
					username: "teste",
					password: "123",
					email: "teste@teste.com",
				},
			},
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			precoSaida: 20,
			dataEntrada: new Date('2024-03-01 15:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});

		operacaoRepository.create({
			id: "efg",
			ativo: {
				id: "abc",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
				multiplicador: 2,
				dataVencimento: '2026-01-01',
			},
			contaId: 'ccc',
			conta: {
				id: '123',
				nome: 'teste',
				tipo: "simulador",
				usuarioId: 'xyz',
				saldoInicial: 0.00,
				saldo: 100.00,
				usuario: {
					id: "abc",
					nome: "Teste",
					username: "teste",
					password: "123",
					email: "teste@teste.com",
				},
			},
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 30,
			precoSaida: 30,
			dataEntrada: new Date('2024-03-01 15:00'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});
	})

	it('should remove Operacao', async () => {
		const response = await removeOperacaoController({id: 'efg', operacaoRepository, contaRepository});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data.length).toEqual(2);
		expect(contaRepository.data[0].saldo).toEqual(60);
	});

	it('should return 404 if Operacao not found', async () => {
		const response = await removeOperacaoController({id: 'eee', operacaoRepository, contaRepository});
		expect(response.status).toEqual(404)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await removeOperacaoController(null);
		expect(response.status).toEqual(500);
	});
});
