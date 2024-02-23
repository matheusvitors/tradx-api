import { createAtivoController } from "@/application/controllers/ativo";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Create Ativo Controller', () => {
	const repository = new InMemoryRepository<Ativo>();

	it('should create ativo', async () => {
		const input: Omit<Ativo, 'id'> = {
			nome: 'teste',
			acronimo: "TSTE1",
			tipo: "indice",
			dataVencimento: new Date("01/01/2025")
		}

		const response = await createAtivoController({input, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].dataVencimento).toEqual(new Date("01/01/2025"));
	});

	it('should return 422 when pass invalid data', async () => {
		const input: Omit<Ativo, 'id'> = {
			nome: 'T',
			acronimo: "TSTE1",
			tipo: "indice",
			dataVencimento: new Date("01/01/2025")
		}

		const response = await createAtivoController({repository, input});
		expect(response.status).toEqual(422);
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createAtivoController(null);
		expect(response.status).toEqual(500)
	});
})
