import { faker } from '@faker-js/faker';
import { Usuario } from "@/core/models";
import { newID } from "@/infra/adapters/newID";

export const user: Usuario = {
	id: newID(),
	nome: 'Tester',
	username: faker.internet.username(),
	password: "123",
	email: faker.internet.email()
}
