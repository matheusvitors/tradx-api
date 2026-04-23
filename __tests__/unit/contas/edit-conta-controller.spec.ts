import { beforeAll, describe, expect, it } from "vitest";
import { editController } from "@/application/controllers/generic";
import { ContaDTO } from "@/application/dto";
import { Conta } from "@/core/models";
import { validateConta } from "@/core/validators";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";

describe('Edit Conta Controller', () => {
	const repository = new InMemoryRepository<ContaDTO & {id: string}>();

	beforeAll(() => {
		repository.create({
			id: 'abc',
			nome: 'teste',
			tipo: "simulador",
			usuarioId: 'xyz',
			saldoInicial: 0.00,
			saldo: 0.00,
		})
	})

	it('should edit conta', async () => {
		const input = {
			id: 'abc',
			nome: 'joao',
			tipo: "real",
			saldoInicial: 25.10,
			usuarioId: 'xyz',
		}

		const response = await editController<ContaDTO>({input, repository, validate: () => validateConta(input)});
		expect(response.status).toEqual(200);
	});

	it('should return 404 if user not found', async () => {
		const input: ContaDTO & {id: string} = {
			id: '123',
			nome: 'joao',
			tipo: "real",
			saldoInicial: 25.10,
			usuarioId: 'abc',
		}

		const response = await editController<ContaDTO>({input, repository, validate: () => validateConta(input)});
		expect(response.status).toEqual(404);
	});

	it('should return 422 when not pass conta id', async () => {
		//@ts-ignore
		const input: ContaDTO & {id: string} = {
			nome: 'j',
			tipo: "real",
			saldoInicial: 25.10,
			usuarioId: 'xyz',
		}

		const response = await editController<ContaDTO>({input, repository, validate: () => validateConta(input)});
		expect(response.status).toEqual(422);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: ContaDTO & {id: string} = {
			id: 'abc',
			nome: 'j',
			tipo: "real",
			saldoInicial: 25.10,
			usuarioId: 'xyz',
		}

		const response = await editController<ContaDTO>({input, repository, validate: () => validateConta(input)});
		expect(response.status).toEqual(422);
	});

	it('should return 500 if have error server', async () => {

		//@ts-ignore
		const response = await editController<Conta>(null);
		expect(response.status).toEqual(500);
	});

});
