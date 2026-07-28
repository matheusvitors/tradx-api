import { Ativo } from "@/core/models";
import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { ativoRepository } from "@/infra/database/repositories";
import { newID } from "@/infra/adapters/newID";
import { acronimoGenerator } from "../../utils/acronimo-generator";

describe('Edit Ativo - Integration Test', () => {

	const input1: Ativo = {
		id: newID(),
		nome: "Teste",
		acronimo: acronimoGenerator(),
		tipo: "indice",
		multiplicador: 1,
		dataVencimento: new Date('2025-01-01'),
	}

	const input2: Ativo = {
		id: newID(),
		nome: "Teste",
		acronimo: acronimoGenerator(),
		tipo: "indice",
		multiplicador: 1,
		dataVencimento: new Date('2025-01-01'),
	}

	beforeAll(async () => {
		await ativoRepository.create(input1);
		await ativoRepository.create(input2);
	})

	it('should edit ativo', async () => {
		const input: Ativo = {
			...input1,
			tipo: 'acao'
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
	});

	it('should return 404 if ativo not found', async () => {
		const input: Ativo = {
			id: newID(),
			nome: "Teste",
			acronimo: acronimoGenerator(),
			tipo: "acao",
			multiplicador: 1,
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(404);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: Ativo = {
			...input1,
			nome: "t",
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(422);
	});

	it('should return 409 when pass duplicated acronimo', async () => {
		const input: Ativo = {
			id: input1.id,
			nome: 'Teste',
			acronimo: input2.acronimo,
			tipo: "indice",
			multiplicador: 1,
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/ativos')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(409);
	});
});
