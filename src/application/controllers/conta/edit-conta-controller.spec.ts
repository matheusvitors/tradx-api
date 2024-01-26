import { editContaController } from "@/application/controllers/conta";
import { ContaDTO } from "@/application/dto";
import { Conta } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Create Conta Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	beforeAll(() => {
		repository.create({
			id: 'abc',
			nome: 'teste',
			tipo: "simulador",
			usuarioId: 'xyz',
		})
	})

	it('should edit conta', async () => {
		const data = {
			id: 'abc',
			nome: 'joao',
			tipo: "real",
			usuarioId: 'xyz',
		}

		const response = await editContaController({data, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].nome).toEqual('joao');
	});

	it('should return 404 if user not found', async () => {
		const data: ContaDTO = {
			id: '123',
			nome: 'j',
			tipo: "real",
			usuarioId: 'xyz',
		}

		const response = await editContaController({data, repository});
		expect(response.status).toEqual(404);
	});

	it('should return 422 when pass invalid data', async () => {
		const data: ContaDTO = {
			id: 'abc',
			nome: 'j',
			tipo: "real",
			usuarioId: 'xyz',
		}

		const response = await editContaController({data, repository});
		expect(response.status).toEqual(422);
	});

	it('should return 500 if have error server', async () => {

		//@ts-ignore
		const response = await editContaController(null);
		expect(response.status).toEqual(500);
	});

});
