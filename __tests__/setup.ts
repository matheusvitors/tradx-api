import { Usuario } from "@/core/models";
import { newID } from "@/infra/adapters/newID";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";
import { beforeAll } from "vitest";

export const user: Usuario ={
	id: newID(),
	nome: 'Tester',
	username: "test",
	password: "123",
	email: "test@test.com"
}

beforeAll(async () => {
	await usuarioRepository.create(user);
})
