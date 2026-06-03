import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { contaRepository } from "@/infra/database/repositories";
import { newID } from "@/infra/adapters/newID";

describe('Get Conta - Integration Test', () => {

	const input = {
		id: newID(),
		nome: 'teste',
		tipo: "simulador",
		saldo: 30.15,
		saldoInicial: 2.50,
		usuarioId: user.id,
	}
	beforeAll(() => {
		contaRepository.create(input)
	})

	it('should get conta', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get(`/contas/${input.id}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.saldoInicial).toEqual(2.50);
		expect(response.body.response.content.saldo).toEqual(30.15);
	});

	it('should return 404 if conta not found', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get(`/contas/${newID()}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(404)
	});

	it('should return 403 if try to get conta from another user', async () => {
		const token = jwt.encode({payload: {auth: true, id: newID()}})
		const response = await supertest(app)
		.get(`/contas/${input.id}`)
		.set({ authorization: `Bearer ${token}`});

		expect(response.status).toEqual(403);
	});

});
