import { jwt } from "@/infra/adapters/jwt";
import { app } from "@/server";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, sign, verify } from "jsonwebtoken";
import { SECRET } from "@/infra/config/environment";
import { vi, afterEach, expect, describe, it, beforeAll } from "vitest";
import supertest from "supertest";

vi.mock("@/infra/adapters/jwt", () => ({
	jwt: {
		encode: vi.fn(),
		verify: vi.fn(),
	}
}));


describe('Authorization', () => {

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('should let the request pass without needing to authorize', async () => {
		const response = await supertest(app).get('/');
		expect(response.status).toEqual(200);
	});

	it('should deny authorization if not pass the token', async () => {
		const response = await supertest(app)
		.get('/users');

		expect(response.status).toEqual(401);
	});

	it('should deny authorization if access type is wrong', async () => {
		const token = jwt.encode({payload: { teste: true }});
		const response = await supertest(app)
		.get('/users')
		.set({ authorization: `token ${token}` });

		expect(response.status).toEqual(401);
	});

	it('should authorize a user', async () => {
		const token = sign({ id: 'abc' }, SECRET || 'thisisascret');

		const response = await supertest(app)
		.get('/ativos')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(200);

	});

	it('should deny authorization if you pass an invalid token', async () => {
		vi.mocked(jwt.verify).mockImplementation(() => {
			throw new JsonWebTokenError('Invalid token');
		})

		const token = 'abc';
		const response = await supertest(app)
		.get('/users')
		.set({ authorization: `Bearer ${token}` });

		expect(response.statusCode).toEqual(401);

	});

	it('should deny authorization case the token is expired', async () => {
		vi.mocked(jwt.verify).mockImplementation(() => {
			throw new TokenExpiredError('jwt expired', new Date((new Date().getTime()) + (15*60*1000)));
		})

		const token = 'abc';
		const response = await supertest(app)
		.get('/ativos')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(401);
		// expect(response.body.message).toEqual('Token expirado.');

	});

	it('should deny authorization case current time of expiration is before claim', async () => {
		vi.mocked(jwt.verify).mockImplementation(() => {
			throw new NotBeforeError('jwt not active', new Date((new Date().getTime()) - (15*60*1000)) );
		})

		const token = 'abc';
		const response = await supertest(app)
		.get('/users')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(401);
		// expect(response.body.message).toEqual('Jwt inativo.');

	});

	// it('should deny authorization if user try to delete another user', async () => {
	// 	const token = sign({ id: 'abc' }, SECRET || 'thisisascret');

	// 	vi.mocked(jwt.verify).mockImplementation(() => {
	// 		return { payload: { id: 'abc' }}
	// 	})

	// 	const response = await supertest(app)
	// 	.delete('/users/cde')
	// 	.set({ authorization: `Bearer ${token}` });

	// 	expect(response.status).toEqual(401);
	// 	expect(response.body.message).toEqual('Você não está autorizado a excluir este usuário.');

	// });

	it('should throw an error when authorizing the user', async () => {
		vi.mocked(jwt.verify).mockImplementation(() => {
			throw new Error();
		})

		const token = jwt.encode({ payload: { teste: true }});

		const response = await supertest(app)
		.get('/users')
		.set({ authorization: `Bearer ${token}` });

		expect(response.status).toEqual(500);

	});
});
