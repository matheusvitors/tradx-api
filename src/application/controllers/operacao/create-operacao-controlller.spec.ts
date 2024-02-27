import { createOperacaoController } from "@/application/controllers/operacao";
import { OperacaoDTO } from "@/application/dto";
import { Ativo, Conta, Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { beforeAll, describe, expect, it } from "vitest";

describe('Create Operacao Controller', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();

	beforeAll(() => {
		ativoRepository.create({
			id: "abc",
			nome: "Teste",
			acronimo: "TSTE1",
			tipo: "indice",
			dataVencimento: new Date("2025-01-01")
		})

		contaRepository.create({
			id: '123',
			nome: 'teste',
			tipo: "simulador",
			usuarioId: 'xyz',
			saldoInicial: 0.00,
			saldo: 0.00
		})
	})


	it('should create a operacao', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "abc",
			contaId: "123",
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

		const response = await createOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(200);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "abc",
			contaId: "123",
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

		const response = await createOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(422)
	});

	it('should return 404 when conta not exist', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "abc",
			contaId: "zzz",
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

		const response = await createOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(404)
	});

	it('should return 404 when ativo not exist', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "zzz",
			contaId: "123",
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

		const response = await createOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(404)
	});

	it('should return 422 when dataEntrada is out if ativo expiration', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "abc",
			contaId: "123",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date('2025-01-02'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await createOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(422)
	});

	it('should return 422 when dataSaida is after dataEntrada', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "abc",
			contaId: "123",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: new Date(),
			dataSaida: new Date('03/01/2024'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await createOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(422)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createOperacaoController(null);
		expect(response.status).toEqual(500)
	});
})
