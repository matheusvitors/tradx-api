import { getOperacaoController } from "@/application/controllers/operacao";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { format } from "date-fns";
import { beforeAll, describe, expect, it } from "vitest";

describe("Get Operacao Controller", () => {
	const repository = new InMemoryRepository<Operacao>();

	beforeAll(() => {
		const input: Operacao = {
			id: "abc",
			ativo: {
				id: "123",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
				multiplicador: 1
			},
			conta: {
				id: '1',
				nome: "teste",
				tipo: "simulador",
				saldo: 0,
				saldoInicial: 0,
				usuario: {
					id: '1',
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
		};
		repository.create(input);
	});

	it("should get operacao", async () => {
		const response = await getOperacaoController({ id: "abc", repository });

		expect(response.status).toEqual(200);
		expect(response.body.content.tipo).toEqual("compra");
	});

	it("should return 404 if operacao not found", async () => {
		const response = await getOperacaoController({ id: "eee", repository });
		expect(response.status).toEqual(404);
	});

	it("should return 500 if have error server", async () => {
		//@ts-ignore
		const response = await getOperacaoController(null);
		expect(response.status).toEqual(500);
	});
});
