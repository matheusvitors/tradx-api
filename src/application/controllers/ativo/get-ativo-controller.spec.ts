import { getAtivoController } from "@/application/controllers/ativo";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Get Conta Controller', () => {
	const repository = new InMemoryRepository<Ativo>();

	beforeAll(() => {
		const input: Ativo = {
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "indice",
			multiplicador: 1,
		}

		repository.create(input)
	})

	it('should get ativo', async () => {
		const response = await getAtivoController({id: 'abc', repository});
		expect(response.status).toEqual(200)
		expect(response.body.content.id).toEqual('abc')
	});

	it('should return 404 if conta not found', async () => {
		const response = await getAtivoController({id: 'eee', repository});
		expect(response.status).toEqual(404)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await getAtivoController(null);
		expect(response.status).toEqual(500);
	});
});
