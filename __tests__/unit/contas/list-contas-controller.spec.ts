import { listContasController } from "@/application/controllers/conta/list-contas-controller";
import { Conta } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Conta List Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	it('should list contas', async () => {
		const response = await listContasController(repository);
		expect(response.status).toEqual(200)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await listContasController(null);
		expect(response.status).toEqual(500);
	});
});
