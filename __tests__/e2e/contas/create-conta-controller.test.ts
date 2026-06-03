import { jwt } from "@/infra/adapters/jwt";
import { newID } from "@/infra/adapters/newID";
import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { describe, expect, it } from "vitest";

describe('Create Conta - Integration Test', () => {

	it('should create a conta', async () => {
		const input = {
			id: newID(),
			nome: 'teste',
			tipo: "simulador",
			saldoInicial: 10.35,
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.post('/contas')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(201);
	});

	it('should return 422 when pass invalid data', async () => {
		const input = {
			id: newID(),
			nome: 't',
			tipo: "simulador",
			saldoInicial: 10.00,
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.post('/contas')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(422)
	});

	it('should return 422 when pass invalid tipo', async () => {
		const input = {
			id: newID(),
			nome: 'teste',
			tipo: "nada",
			saldoInicial: 10.00,
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.post('/contas')
		.send(input)
		.set({ authorization: `Bearer ${token}`});

		expect(response.status).toEqual(422)
	});

	it('should return 404 when not find the user', async () => {
		const input = {
			id: newID(),
			nome: 'teste',
			tipo: "simulador",
			saldoInicial: 10.00,
		}

		const token = jwt.encode({payload: {auth: true, id: newID()}})
		const response = await supertest(app)
		.post('/contas')
		.send(input)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(404)
	});

})
