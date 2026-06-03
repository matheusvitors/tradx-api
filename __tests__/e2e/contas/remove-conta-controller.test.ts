import { user } from "../../artifacts";
import { beforeAll, describe, expect, it } from "vitest";
import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import supertest from "supertest";
import { ContaDTO } from "@/application/dto";
import { newID } from "@/infra/adapters/newID";
import { contaRepository } from "@/infra/database/repositories";

describe('Remove Operacao - Integration Test', () => {
	const input: ContaDTO = {
		id: newID(),
		nome: "Teste",
		tipo: "simulador",
		saldoInicial: 0,
		usuarioId: user.id
	}

	const input2: ContaDTO = {
		id: newID(),
		nome: "Teste",
		tipo: "simulador",
		saldoInicial: 0,
		usuarioId: user.id
	}


	beforeAll(() => {
		contaRepository.create(input)
		contaRepository.create(input2)
	})


	it('should remove conta', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.delete(`/contas/${input.id}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
	});

	it('should return 404 if conta not found', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.delete(`/contas/${newID()}`)
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(404)
	});

	it('should return 403 if try to get conta from another user', async () => {
		const token = jwt.encode({payload: {auth: true, id: newID()}})
		const response = await supertest(app)
		.delete(`/contas/${input2.id}`)
		.set({ authorization: `Bearer ${token}`});

		expect(response.status).toEqual(403);
	});

});
