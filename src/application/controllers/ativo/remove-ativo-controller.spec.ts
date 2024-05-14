import { getAtivoController } from "@/application/controllers/ativo/get-ativo-controller";
import { removeAtivoController } from "@/application/controllers/ativo/remove-ativo-controller";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Remove Ativo Controller', () => {
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

	it('should remove ativo', async () => {
		const response = await removeAtivoController({id: 'abc', repository});
		expect(response.status).toEqual(200);
		expect(repository.data.length).toEqual(0);
	});

	it('should return 404 if ativo not found', async () => {
		const response = await getAtivoController({id: 'eee', repository});
		expect(response.status).toEqual(404)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await getAtivoController(null);
		expect(response.status).toEqual(500);
	});
});
