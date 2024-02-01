import { editOperacaoController } from "@/application/controllers/operacao";
import { OperacaoDTO } from "@/application/dto";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Create Operacao Controller', () => {
	const repository = new InMemoryRepository<Operacao>();

	beforeAll(() => {
		const input: Operacao = {
			id: "abc",
			ativo: {
				id: "123",
				nome: "Teste",
				acronimo: "TSTE1",
				tipo: "indice",
			},
			conta: {
				id: "efg",
				nome: "teste",
				tipo: "simulador",
				usuario: {
					id: "hij",
					nome: "Teste",
					username: "teste",
					password: "123",
					email: "teste@teste.com",
				},
			},
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		};
		repository.create(input);
	});

	it('should edit operacao', async () => {
		const input: OperacaoDTO = {
			id: 'abc',
			ativoId: "aaa",
			contaId: "ccc",
			quantidade: 1,
			tipo: "venda",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, repository});
		expect(response.status).toEqual(200);
		expect(repository.data[0].tipo).toEqual('venda');
	});

	it('should return 404 if user not found', async () => {
		const input: OperacaoDTO = {
			id: 'zzz',
			ativoId: "aaa",
			contaId: "ccc",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, repository});
		expect(response.status).toEqual(404);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: OperacaoDTO = {
			id: 'zzz',
			ativoId: "aaa",
			contaId: "ccc",
			quantidade: 1,
			tipo: "teste",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date(),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, repository});
		expect(response.status).toEqual(422);
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await editOperacaoController(null);
		expect(response.status).toEqual(500);
	});

});
