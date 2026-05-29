import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { clearDatabase } from "../../e2e/setup";
import { AtivoDTO } from "@/application/dto";
import { acronimoGenerator } from "../../utils/acronimo-generator";

describe('Create Ativo - Integration Test', () => {

	const acronimo = acronimoGenerator()

	it('should create ativo', async () => {
		const input: AtivoDTO = {
			nome: 'teste',
			acronimo,
			tipo: "indice",
			multiplicador: 0.2,
			dataVencimento: new Date('2025-01-02'),
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.post('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(201);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: AtivoDTO = {
			nome: 'T',
			acronimo: acronimoGenerator(),
			tipo: "indice",
			multiplicador: 3,
			dataVencimento: new Date('2025-01-01'),
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.post('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(422);
	});

	it('should return 409 when pass duplicated acronimo', async () => {
		const input: AtivoDTO = {
			nome: 'Teste',
			acronimo,
			tipo: "indice",
			multiplicador: 3,
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.post('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(409);
	});
})
