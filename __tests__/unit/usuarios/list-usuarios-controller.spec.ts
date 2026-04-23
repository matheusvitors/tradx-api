import { listController } from "@/application/controllers/generic";
import { Usuario } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Usuario List Controller', () => {
	const repository = new InMemoryRepository<Usuario>();

	it('should list users', async () => {
		const response = await listController<Usuario>(repository);
		expect(response.status).toEqual(200)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await listController<Usuario>(null);
		expect(response.status).toEqual(500);
	});
});
