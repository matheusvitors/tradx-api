import { Conta, Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { user } from "../../artifacts";
import { beforeAll, describe, expect, it } from "vitest";
import { removeController } from "@/application/controllers/generic";

describe('Remove Operacao Controller', () => {
	const repository = new InMemoryRepository<Conta>();

	beforeAll(() => {
		const input: Operacao = {
			id: "abc",
			ativo: {
				id: "123",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
				multiplicador: 1
			},
			conta: {
				id: '1',
				nome: "teste",
				tipo: "simulador",
				saldo: 0,
				saldoInicial: 0,
				usuario: {
					id: '1',
					nome: "Teste",
					username: "teste",
					password: "123",
					email: "teste@teste.com",
				},
			},
			regraEntrada: {
				id: "sdfd",
				tradingPlan: {
					id: "sadasd",
					usuario: user,
					nome: "Teste"
				},
				nome: "Teste"
			},
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date(),
			operacaoPerdida: false,
			operacaoErrada: false,
		};
		repository.create(input);
	});


	it('should remove conta', async () => {
		const response = await removeController<Conta>({id: 'abc', repository});
		expect(response.status).toEqual(200);
		expect(repository.data.length).toEqual(0);
	});

	it('should return 404 if conta not found', async () => {
		const response = await  removeController<Conta>({id: 'eee', repository});
		expect(response.status).toEqual(404)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await  removeController<Conta>(null);
		expect(response.status).toEqual(500);
	});
});
