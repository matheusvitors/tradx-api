import { beforeAll, describe, expect, it } from "vitest";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { Usuario } from "@prisma/client";
import { getUsuarioController } from "@/application/controllers/usuario";

describe('Usuario List Controller', () => {
	const repository = new InMemoryRepository<Usuario>();

	beforeAll(() => {
		repository.create({
			id: 'abc',
			nome: 'Teste',
			username: 'teste',
			password: '123',
			email: 'teste@teste.com'
		})
	})

	it('should list users', async () => {
		const response = await getUsuarioController({repository, id: ''});
		expect(response.status).toEqual(200)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await getUsuarioController(null);
		expect(response.status).toEqual(500);
	});
});
