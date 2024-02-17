import { getContaController } from "@/application/controllers/conta/get-conta-controller";
import { Conta } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Get Conta Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	beforeAll(() => {
		repository.create({
			id: 'abc',
			nome: 'teste',
			tipo: "simulador",
			saldo: 30.15,
			saldoInicial: 2.50,
			usuario: {
				id: 'xyz',
				nome: 'Teste',
				username: 'teste',
				password: '123',
				email: 'teste@teste.com'
			}

		})
	})

	it('should get conta', async () => {
		const response = await getContaController({id: 'abc', repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].saldo).toEqual(30.15);

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
