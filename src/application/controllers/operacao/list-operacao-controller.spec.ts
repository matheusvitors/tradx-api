import { listOperacaoController } from "@/application/controllers/operacao/list-operacao-controller";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe("Operacao List Controller", () => {
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
			conta: {
				id: "abc",
				nome: "teste",
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
			dataEntrada: new Date('2024-12-02'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});

		repository.create({
			id: "efg",
			ativo: {
				id: "123",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
			},
			conta: {
				id: "456",
				nome: "teste",
				tipo: "simulador",
				saldo: 0,
				saldoInicial: 0,
				usuario: {
					id: "789",
					nome: "Teste",
					username: "teste",
					password: "123",
					email: "teste@teste.com",
				},
			},
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 20,
			stopLoss: 15,
			alvo: 30,
			dataEntrada: new Date('2024-12-01'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		});
	});

	it("should list operacaos", async () => {
		const response = await listOperacaoController(repository);
		expect(response.status).toEqual(200);
		expect(response.body.content[0].id).toEqual("abc");
	});

	it("should return 500 if have error server", async () => {
		//@ts-ignore
		const response = await listOperacaoController(null);
		expect(response.status).toEqual(500);
	});
});
