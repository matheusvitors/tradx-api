import { beforeAll, describe, expect, it } from "vitest";
import { listOperacaoByContaController } from "@/application/controllers/operacao/list-operacao-by-conta-controller";
import { OperacaoDTO } from "@/application/dto";
import { newID } from "@/infra/adapters/newID";
import { operacaoRepository } from "@/infra/database/repositories";
import { ativo1, conta1, regraEntrada1, ativo2, conta2, user } from "../../artifacts";
import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import supertest from "supertest";

describe("List Operacao By Conta - Integration Test", () => {
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

	it("should list operacoes by conta", async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response1 = await supertest(app)
		.get('/operacoes')
		.set({ authorization: `Bearer ${token}` });

		expect(response1.status).toEqual(200);
		expect(response1.body.content[0].id).toEqual("abc");

	});

	it("should return 404 if conta not exist", async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get('/operacoes')
		.set({ authorization: `Bearer ${token}` });
		expect(response.status).toEqual(404);
	});
});
