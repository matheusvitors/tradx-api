import { describe, expect, it } from "vitest";
import supertest from "supertest";
import { app } from "@/server";
import { SECRET } from "@/infra/config/environment";
import { sign } from "jsonwebtoken";
import { user } from "../setup";

describe('See your profile - Integration Test', () => {
	it('should get user information', async () => {
		const token = sign({ id: user.id }, SECRET || 'thisisascret');
		const response = await supertest(app)
		.get('/me')
		.set({ authorization: `token ${token}` });

		expect(response.status).toEqual(200);
		expect(response.body.response.content.length).above(1);
	});
});
