import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { ativo1, conta1, regraEntrada1, user } from "../../../__tests__/artifacts";
import { beforeAll, describe, expect, it } from "vitest";
import { getController } from "@/application/controllers/generic";
import { OperacaoDTO } from "@/application/dto";

describe.skip("Get Operacao - Integration Test", () => {
	const repository = new InMemoryRepository<Operacao>();

	beforeAll(() => {
		const input: OperacaoDTO = {
			id: "abc",
			ativoId: ativo1.id,
			contaId: conta1.id!,
			regraEntradaId: regraEntrada1.id,
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: '2026-01-02',
			operacaoPerdida: false,
			operacaoErrada: false,
		};
		repository.create(input);
	});

	it("should get operacao", async () => {
		const response = await getController<Operacao, OperacaoDTO>({ id: "abc", repository });

		expect(response.status).toEqual(200);
		expect(response.body.content.tipo).toEqual("compra");
	});

	it("should return 404 if operacao not found", async () => {
		const response = await getController<Operacao, OperacaoDTO>({ id: "eee", repository });
		expect(response.status).toEqual(404);
	});
});
