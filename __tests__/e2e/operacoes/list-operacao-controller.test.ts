import { OperacaoDTO } from "@/application/dto";
import { Operacao } from "@/core/models";
import { newID } from "@/infra/adapters/newID";
import { ativo1, ativo2, conta1, conta2, regraEntrada1, user } from "../../artifacts";
import { beforeAll, describe, expect, it } from "vitest";
import { operacaoRepository } from "@/infra/database/repositories";
import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import supertest from "supertest";

describe("List Operação - Integration Test", () => {

	const input: OperacaoDTO = {
		id: newID(),
		ativoId: ativo1.id,
		contaId: conta1.id!,
		regraEntradaId: regraEntrada1.id,
		quantidade: 1,
		tipo: "compra",
		precoEntrada: 100,
		stopLoss: 90,
		alvo: 150,
		dataEntrada: "2026-01-02",
		operacaoPerdida: false,
		operacaoErrada: false
	}

	const input2: OperacaoDTO = {
		id: newID(),
		ativoId: ativo2.id,
		contaId: conta2.id!,
		regraEntradaId: regraEntrada1.id,
		quantidade: 1,
		tipo: "compra",
		precoEntrada: 100,
		stopLoss: 90,
		alvo: 150,
		dataEntrada: "2026-01-02",
		operacaoPerdida: false,
		operacaoErrada: false
	}

	beforeAll(async () => {
		await operacaoRepository.create(input);
		await operacaoRepository.create(input2);
	});

	it("should list operacaos", async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get('/operacoes')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.some((operacao: any) => operacao.id === input.id)).toBeTruthy();
		expect(response.body.response.content.some((operacao: any) => operacao.id === input2.id)).toBeTruthy();

	});
});
