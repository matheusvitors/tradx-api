import { getContaController } from "@/application/controllers/conta/get-conta-controller";
import { removeContaController } from "@/application/controllers/conta/remove-conta-controller";
import { Conta } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Remove Conta Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	beforeAll(() => {
		repository.create({
			id: 'abc',
			nome: 'teste',
			tipo: "simulador",
			usuario: {
				id: 'xyz',
				nome: 'Teste',
				username: 'teste',
				password: '123',
				email: 'teste@teste.com'
			}

		})
	})

	it('should remove conta', async () => {
		const response = await removeContaController({id: 'abc', repository});
		expect(response.status).toEqual(200);
		expect(repository.data.length).toEqual(0);
	});

	it('should return 404 if conta not found', async () => {
		const response = await getContaController({id: 'eee', repository});
		expect(response.status).toEqual(404)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await getContaController(null);
		expect(response.status).toEqual(500);
	});
});
