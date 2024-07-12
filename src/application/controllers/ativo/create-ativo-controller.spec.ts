import { createAtivoController } from "@/application/controllers/ativo";
import { AtivoDTO } from "@/application/dto";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Create Ativo Controller', () => {
	const repository = new InMemoryRepository<Ativo>();

	beforeAll(() => {
		const input: Ativo = {
			id: 1,
			publicId: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "indice",
			multiplicador: 2,
			dataVencimento: new Date("01/01/2025"),
			createdAt: new Date(),
			updatedAt: new Date()
		}

		repository.create(input)
	})
	it('should create ativo', async () => {
		const input: AtivoDTO = {
			publicId: 'abc',
			nome: 'teste',
			acronimo: "TSTE3",
			tipo: "indice",
			multiplicador: 0.2,
			dataVencimento: new Date("01/01/2026")
		}

		const response = await createAtivoController({input, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[1].dataVencimento).toEqual(new Date("01/01/2026"));
		expect(repository.data[1].multiplicador).toEqual(0.2);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: AtivoDTO = {
			publicId: 'abc',
			nome: 'T',
			acronimo: "TSTE2",
			tipo: "indice",
			multiplicador: 3,
			dataVencimento: new Date("01/01/2025")
		}

		const response = await createAtivoController({repository, input});
		expect(response.status).toEqual(422);
	});

	it('should return 409 when pass duplicated acronimo', async () => {
		const input: AtivoDTO = {
			publicId: 'abc',
			nome: 'Teste',
			acronimo: "TSTE1",
			tipo: "indice",
			multiplicador: 3,
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
