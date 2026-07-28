import { faker } from '@faker-js/faker';
import { Ativo, Usuario } from "@/core/models";
import { newID } from "@/infra/adapters/newID";
import { ContaDTO, RegraEntradaDTO, TradingPlanDTO } from '@/application/dto';

export const user: Usuario = {
	id: newID(),
	nome: faker.person.fullName(),
	username: faker.internet.username(),
	password: "123",
	email: faker.internet.email(),
}

export const user2: Usuario = {
	id: newID(),
	nome: faker.person.fullName(),
	username: faker.internet.username(),
	password: "123",
	email: faker.internet.email(),
}

export const ativo1: Ativo = {
	id: newID(),
	nome: 'Ativo1',
	acronimo: 'ATVO1',
	multiplicador: 1,
	tipo: 'indice'
}

export const ativo2: Ativo = {
	id: newID(),
	nome: 'Ativo2',
	acronimo: 'ATVO2',
	multiplicador: 1,
	tipo: 'indice'
}

export const conta1: ContaDTO = {
	id: newID(),
	nome: 'Conta 1',
	tipo: 'simulador',
	saldoInicial: 0,
	usuarioId: user.id
}

export const conta2: ContaDTO = {
	id: newID(),
	nome: 'Conta 2',
	tipo: 'simulador',
	saldoInicial: 0,
	usuarioId: user2.id
}

export const tradingPlan: TradingPlanDTO = {
	id: newID(),
	nome: '',
	usuarioId: user.id
}

export const regraEntrada1: RegraEntradaDTO = {
	id: newID(),
	tradingPlanId: tradingPlan.id,
	nome: 'regra 1'
}

export const regraEntrada2: RegraEntradaDTO = {
	id: newID(),
	tradingPlanId: tradingPlan.id,
	nome: 'regra 2'
}
