import { listAtivosController } from "@/application/controllers/ativo";
import { Ativo } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Conta List Controller', () => {
	const repository = new InMemoryRepository<Ativo>();

	it('should list contas', async () => {
		const response = await listAtivosController(repository);

		expect(response.status).toEqual(200);
		expect(response.body.content.length).toEqual(0);
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await listAtivosController(null);
		expect(response.status).toEqual(500);
	});
});
