import { beforeAll } from "vitest";
import { faker } from '@faker-js/faker';
import { Usuario } from "@/core/models";
import { newID } from "@/infra/adapters/newID";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";
import { reset, seed } from "drizzle-seed";
import { database } from "@/infra/database";
import * as schema from '../src/infra/database/schema'

async function main() {
	await reset(database, schema);
	console.log('banco limpo');
}
main();

export const user: Usuario ={
	id: newID(),
	nome: 'Tester',
	username: faker.internet.username(),
	password: "123",
	email: faker.internet.email()
}

beforeAll(async () => {
	const result = await usuarioRepository.get(user.id);

	if(!result) {
		await usuarioRepository.create(user);
	}
})
