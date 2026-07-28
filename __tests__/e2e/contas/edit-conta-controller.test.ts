import { beforeAll, describe, expect, it } from "vitest";
import { ContaDTO } from "@/application/dto";
import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { user, user2 } from "../../artifacts";
import supertest from "supertest";
import { newID } from "@/infra/adapters/newID";
import { contaRepository } from "@/infra/database/repositories";

describe('Edit Conta - Integration Test', () => {
	const input = {
		id: newID(),
		nome: 'teste',
		tipo: "simulador",
		saldoInicial: 0.00,
	}

	beforeAll(async () => {
		await contaRepository.create({...input, usuarioId: user.id,})
	})

	it('should edit conta', async () => {
		const editInput = {
			...input,
			nome: 'joao'
		}

		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/contas')
		.send(editInput)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
	});

	it('should return 422 when not pass conta id', async () => {
		const editInput = {
			...input,
			id: undefined
		}
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/contas')
		.send(editInput)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(422);
	});

	it('should return 422 when pass invalid data', async () => {
		const editInput = {
			...input,
			nome: 'j'
		}
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.put('/contas')
		.send(editInput)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(422);
	});

	it('should return 403 if try to edit conta from another user', async () => {
		const editInput = {
			...input,
			nome: 'joao'
		}
		console.log('user 2', user2.id);

		const token = jwt.encode({payload: {auth: true, id: user2.id}})
		const response = await supertest(app)
		.put('/contas')
		.send(editInput)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(403);
	});

});
