import { afterAll, beforeAll } from "vitest";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";
import { reset } from "drizzle-seed";
import { database } from "@/infra/database";
import * as schema from '../../src/infra/database/schema'
import { TEST_TYPE } from "@/infra/config/environment";
import { user } from "../artifacts";

export const clearDatabase = async () => {
	await reset(database, schema);
	console.log('banco limpo');
}

beforeAll(async () => {
	if(TEST_TYPE === 'e2e') {
		const result = await usuarioRepository.get(user.id);

		if(!result) {
			await usuarioRepository.create(user);
		}
	}
})

// afterAll(async () => {
// 	await clearDatabase();
// });
