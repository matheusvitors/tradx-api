import { createContaController } from "@/application/controllers/conta/create-conta-controller";
import { Conta } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Create Conta Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	it('should create a conta', async () => {
		const input = {
			nome: 'teste',
			tipo: "simulador",
			saldoInicial: 10.35,
			usuarioId: 'xyz',
		}

		const response = await createContaController({input, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].saldo).toEqual(10.35);
	});

	it('should return 422 when pass invalid data', async () => {
		const input = {
			id: 'abc',
			nome: 't',
			tipo: "simulador",
			saldoInicial: 10.00,
			usuarioId: 'xyz',
		}

		const response = await createContaController({repository, input});
		expect(response.status).toEqual(422)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createContaController(null);
		expect(response.status).toEqual(500)
	});
})
