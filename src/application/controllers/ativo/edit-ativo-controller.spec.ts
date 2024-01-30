import { editAtivoController } from "@/application/controllers/ativo";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Create Ativo Controller', () => {
	const repository = new InMemoryRepository<Ativo>();

	beforeAll(() => {
		const input: Ativo = {
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "indice"
		}

		repository.create(input)
	})

	it('should edit ativo', async () => {
		const input: Ativo = {
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "acao"
		}

		const response = await editAtivoController({input, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].tipo).toEqual('acao');
	});

	it('should return 404 if user not found', async () => {
		const input: Ativo = {
			id: "eee",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "acao"
		}

		const response = await editAtivoController({input, repository});
		expect(response.status).toEqual(404);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: Ativo = {
			id: "abc",
			nome: "t",
			acronimo: "TSTE1",
			tipo: "acao"
		}

		const response = await editAtivoController({input, repository});
		expect(response.status).toEqual(422);
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await editAtivoController(null);
		expect(response.status).toEqual(500);
	});

});
