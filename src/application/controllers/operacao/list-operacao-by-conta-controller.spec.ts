import { listOperacaoByContaController } from "@/application/controllers/operacao/list-operacao-by-conta-controller";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe("Operacao List Controller By Conta", () => {
	const repository = new InMemoryRepository<Operacao>();

	beforeAll(() => {
		repository.create({
			id: "abc",
			ativo: {
				id: "abc",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
			},
			contaId: 'aaa',
			conta: {
				id: "aaa",
				nome: "teste A",
				tipo: "simulador",
				saldo: 0,
				saldoInicial: 0,
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
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});

		repository.create({
			id: "cde",
			ativo: {
				id: "abc",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
			},
			contaId: 'bbb',
			conta: {
				id: "bbb",
				nome: "teste B",
				tipo: "simulador",
				saldo: 0,
				saldoInicial: 0,
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
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});

		repository.create({
			id: "efg",
			ativo: {
				id: "abc",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
			},
			contaId: 'ccc',
			conta: {
				id: "ccc",
				nome: "teste C",
				tipo: "simulador",
				saldo: 0,
				saldoInicial: 0,
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
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});

	});

	it("should list operacoes by conta", async () => {
		const response1 = await listOperacaoByContaController({repository, contaId: 'aaa'});
		expect(response1.status).toEqual(200);
		expect(response1.body.content[0].id).toEqual("abc");

		const response2 = await listOperacaoByContaController({repository, contaId: 'bbb'});
		expect(response2.status).toEqual(200);
		expect(response2.body.content[0].id).toEqual("cde");

		const response3 = await listOperacaoByContaController({repository, contaId: 'ccc'});
		expect(response3.status).toEqual(200);
		expect(response3.body.content[0].id).toEqual("efg");
	});

	it("should return 404 if conta not exist", async () => {
		const response = await listOperacaoByContaController({repository, contaId: 'zzz'});
		expect(response.status).toEqual(404);
	});

	it("should return 500 if have error server", async () => {
		//@ts-ignore
		const response = await listOperacaoByContaController(null);
		expect(response.status).toEqual(500);
	});
});
