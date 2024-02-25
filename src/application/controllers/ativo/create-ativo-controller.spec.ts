import { createAtivoController } from "@/application/controllers/ativo";
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
			tipo: "indice",
			dataVencimento: new Date("01/01/2025")
		}

		repository.create(input)
	})
	it('should create ativo', async () => {
		const input: Omit<Ativo, 'id'> = {
			nome: 'teste',
			acronimo: "TSTE3",
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
			acronimo: "TSTE2",
			tipo: "indice",
			dataVencimento: new Date("01/01/2025")
		}

		const response = await createAtivoController({repository, input});
		expect(response.status).toEqual(422);
	});

	it('should return 409 when pass duplicated acronimo', async () => {
		const input: Omit<Ativo, 'id'> = {
			nome: 'Teste',
			acronimo: "TSTE1",
			tipo: "indice",
		}

		const response = await createAtivoController({repository, input});
		expect(response.status).toEqual(409);
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createAtivoController(null);
		expect(response.status).toEqual(500)
	});
})
