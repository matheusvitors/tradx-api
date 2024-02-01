import { getOperacaoController, removeOperacaoController } from "@/application/controllers/operacao";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Remove Operacao Controller', () => {
	const repository = new InMemoryRepository<Operacao>();

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

	it('should remove Operacao', async () => {
		const response = await removeOperacaoController({id: 'abc', repository});
		expect(response.status).toEqual(200);
		expect(repository.data.length).toEqual(0);
	});

	it('should return 404 if Operacao not found', async () => {
		const response = await getOperacaoController({id: 'eee', repository});
		expect(response.status).toEqual(404)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await getOperacaoController(null);
		expect(response.status).toEqual(500);
	});
});
