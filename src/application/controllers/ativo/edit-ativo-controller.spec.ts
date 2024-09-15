import { editAtivoController } from "@/application/controllers/ativo";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Create Ativo Controller', () => {
	const repository = new InMemoryRepository<Ativo>();

	beforeAll(() => {
		repository.create({
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "indice",
			dataVencimento: '2025-01-01',
		})

		repository.create({
			id: "def",
			nome: "Teste 2",
			acronimo: "TSTE2",
			tipo: "indice",
			dataVencimento: '2025-01-01',
		})
	})

	it('should edit ativo', async () => {
		const input: Ativo = {
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "acao",
			multiplicador: 1,
			dataVencimento: '2025-01-02',
		}

		const response = await editAtivoController({input, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].tipo).toEqual('acao');
		expect(repository.data[0].dataVencimento).toEqual('2025-01-02',);
	});

	it('should return 404 if user not found', async () => {
		const input: Ativo = {
			id: "eee",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "acao",
			multiplicador: 1,
		}

		const response = await editAtivoController({input, repository});
		expect(response.status).toEqual(404);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: Ativo = {
			id: "abc",
			nome: "t",
			acronimo: "TSTE1",
			tipo: "acao",
			multiplicador: 1,
		}

		const response = await editAtivoController({input, repository});
		expect(response.status).toEqual(422);
	});

	it('should return 409 when pass duplicated acronimo', async () => {
		const input: Ativo = {
			id: "abc",
			nome: 'Teste',
			acronimo: "TSTE2",
			tipo: "indice",
			multiplicador: 1,
		}

		const response = await editAtivoController({repository, input});
		expect(response.status).toEqual(409);
	});


	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await editAtivoController(null);
		expect(response.status).toEqual(500);
	});

});
