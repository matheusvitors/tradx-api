import { Ativo } from "@/core/models";
import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { ativoRepository } from "@/infra/database/repositories";
import { newID } from "@/infra/adapters/newID";
import { acronimoGenerator } from "../../utils/acronimo-generator";

describe('Get Ativo - Integration Test', () => {

	const input: Ativo = {
		id: newID(),
		nome: "Teste",
		acronimo: acronimoGenerator(),
		tipo: "indice",
		multiplicador: 1,
	}

	beforeAll(() => {
		ativoRepository.create(input)
	})

	it('should get ativo', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get(`/ativos/${input.id}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.id).toEqual(input.id)
	});

	it('should return 404 if conta not found', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get(`/ativos/${newID()}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(404)
	});

});
