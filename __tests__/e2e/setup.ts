import { beforeAll } from "vitest";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";
import { reset } from "drizzle-seed";
import { database } from "@/infra/database";
import * as schema from '../../src/infra/database/schema'
import { TEST_TYPE } from "@/infra/config/environment";
import { user } from "../artifacts";

async function main() {
	await reset(database, schema);
	console.log('banco limpo');
}

main();

beforeAll(async () => {
	console.log('TEST_TYPE', TEST_TYPE);

	if(TEST_TYPE === 'e2e') {
		const result = await usuarioRepository.get(user.id);

		if(!result) {
			await usuarioRepository.create(user);
		}
	}
})
