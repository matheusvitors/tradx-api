import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/server";
import { user } from "../setup";
import { jwt } from "@/infra/adapters/jwt";

describe('See your profile - Integration Test', () => {
	it('should get user information', async () => {
		const token = jwt.encode({payload: {auth: true, id: user.id}})
		const response = await supertest(app)
		.get('/me')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.usuario).toEqual(user);
	});
});
