import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { user } from "../../artifacts";
import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { ContaDTO } from "@/application/dto";
import { contaRepository } from "@/infra/database/repositories";
import { newID } from "@/infra/adapters/newID";

describe('List Contas - Integration Test', () => {
	const input: ContaDTO = {
		id: newID(),
		nome: "",
		tipo: "",
		saldoInicial: 0,
		usuarioId: ""
	}

	beforeAll(() => {
		contaRepository.create(input)
	})

	it('should list contas', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get('/contas')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.length).toBeGreaterThan(0);
	});

});
