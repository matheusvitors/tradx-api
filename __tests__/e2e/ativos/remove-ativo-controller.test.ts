import { Ativo } from "@/core/models";
import { jwt } from "@/infra/adapters/jwt";
import { newID } from "@/infra/adapters/newID";
import { ativoRepository } from "@/infra/database/repositories";
import { app } from "@/server";
import { user } from "../../artifacts";
import { acronimoGenerator } from "../../utils/acronimo-generator";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

describe('Remove Ativo - Integration Test', () => {

	const input: Ativo = {
		id: newID(),
		nome: "Teste",
		acronimo: acronimoGenerator(),
		tipo: "indice",
		multiplicador: 1,
	}
	beforeAll(async() => {
		await ativoRepository.create(input)
	})

	it('should remove ativo', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get(`/ativos/${input.id}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
	});

	it('should return 404 if ativo not found', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get(`/ativos/${newID()}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(404)
	});
});
