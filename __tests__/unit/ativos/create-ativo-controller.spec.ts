import { createController } from "@/application/controllers/generic";
import { AtivoDTO } from "@/application/dto";
import { Ativo } from "@/core/models";
import { validateAtivo } from "@/core/validators";
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
			multiplicador: 2,
			dataVencimento: new Date('2025-01-01'),
		}

		repository.create(input)
	})

	it('should create ativo', async () => {
		const input: AtivoDTO = {
			id: 'abc',
			nome: 'teste',
			acronimo: "TSTE3",
			tipo: "indice",
			multiplicador: 0.2,
			dataVencimento: new Date('2025-01-01'),
		}

		const response = await createController<Ativo, AtivoDTO>({input, repository, validate: () => validateAtivo(input), uniqueFields: ['acronimo']});
		expect(response.status).toEqual(201);
		expect(repository.data[1].dataVencimento).toEqual(new Date('2025-01-01'));
		expect(repository.data[1].multiplicador).toEqual(0.2);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: AtivoDTO = {
			id: 'abc',
			nome: 'T',
			acronimo: "TSTE2",
			tipo: "indice",
			multiplicador: 3,
			dataVencimento: new Date('2025-01-01'),
		}

		const response = await createController<Ativo, AtivoDTO>({input, repository, validate: () => validateAtivo(input), uniqueFields: ['acronimo']});
		expect(response.status).toEqual(422);
	});

	it('should return 409 when pass duplicated acronimo', async () => {
		const input: AtivoDTO = {
			id: 'abc',
			nome: 'Teste',
			acronimo: "TSTE1",
			tipo: "indice",
			multiplicador: 3,
		}

		const response = await createController<Ativo, AtivoDTO>({input, repository, validate: () => validateAtivo(input), uniqueFields: ['acronimo']});
		expect(response.status).toEqual(409);
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createController<Ativo, AtivoDTO>(null);
		expect(response.status).toEqual(500)
	});
})
