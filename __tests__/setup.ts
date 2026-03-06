import { beforeAll } from "vitest";
import { faker } from '@faker-js/faker';
import { Usuario } from "@/core/models";
import { newID } from "@/infra/adapters/newID";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";

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
