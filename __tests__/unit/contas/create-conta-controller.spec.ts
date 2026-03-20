import { createContaController } from "@/application/controllers/conta/create-conta-controller";
import { createController } from "@/application/controllers/generic";
import { ContaDTO } from "@/application/dto";
import { Conta } from "@/core/models";
import { validateConta } from "@/core/validators";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Create Conta Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	it('should create a conta', async () => {
		const input: ContaDTO = {
			nome: 'teste',
			tipo: "simulador",
			saldoInicial: 10.35,
			usuarioId: 'xyz',
		}

		const response = await createController<Conta, ContaDTO>({input, repository, validate: () => validateConta(input)});
		expect(response.status).toEqual(201);
	});

	it('should return 422 when pass invalid data', async () => {
		const input = {
			id: 'abc',
			nome: 't',
			tipo: "simulador",
			saldoInicial: 10.00,
			usuarioId: 'xyz',
		}

		const response = await createController<Conta, ContaDTO>({input, repository, validate: () => validateConta(input)});
		expect(response.status).toEqual(422)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createController<Conta, ContaDTO>(null);
		expect(response.status).toEqual(500)
	});
})
