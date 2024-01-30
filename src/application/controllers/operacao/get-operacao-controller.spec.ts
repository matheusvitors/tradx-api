import { getOperacaoController } from "@/application/controllers/operacao";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe("Get Operacao Controller", () => {
	const repository = new InMemoryRepository<Operacao>();

	beforeAll(() => {
		beforeAll(() => {
			const input: Operacao = {
				id: "abc",
				ativo: {
					id: "123",
					nome: "Teste",
					acronimo: "TSTE1",
					tipo: "indice",
				},
				conta: {
					id: "efg",
					nome: "teste",
					tipo: "simulador",
					usuario: {
						id: "hij",
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
	});

	it("should get operacao", async () => {
		const response = await getOperacaoController({ id: "abc", repository });
		expect(response.status).toEqual(200);
		expect(response.body.content.tipo).toEqual("conta");
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
