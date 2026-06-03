import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { jwt } from "@/infra/adapters/jwt";
import { newID } from "@/infra/adapters/newID";
import { Ativo } from "@/core/models";
import { ativoRepository } from "@/infra/database/repositories";
import { acronimoGenerator } from "../../utils/acronimo-generator";

describe('List Ativos - Integration Test', () => {

	beforeAll(() => {

		const input: Ativo = {
			id: newID(),
			nome: "Teste",
			acronimo: acronimoGenerator(),
			tipo: "indice",
			multiplicador: 2,
			dataVencimento: new Date('2025-01-01'),
		}

		ativoRepository.create(input);
	})


	it('should list ativos', async () => {

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get('/ativos')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.length).toBeGreaterThan(0);
	});

});
