import { beforeAll, describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/server";
import { jwt } from "@/infra/adapters/jwt";
import { user } from "../../artifacts";
import { TEST_TYPE } from "@/infra/config/environment";
import { usuarioRepository } from "@/infra/database/repositories";

describe('See your profile - Integration Test', () => {

	beforeAll(async () => {

		if(TEST_TYPE === 'e2e') {
			const result = await usuarioRepository.get(user.id);

			if(!result) {
				await usuarioRepository.create(user);
			}
		}
	})

	it('should get user information', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get('/me')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content).toEqual(user);
	});
});
