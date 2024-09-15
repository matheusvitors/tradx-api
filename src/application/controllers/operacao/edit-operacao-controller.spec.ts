import { editOperacaoController } from "@/application/controllers/operacao";
import { OperacaoDTO } from "@/application/dto";
import { Ativo, Conta, Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { format } from "date-fns";
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
			multiplicador: 2,
			dataVencimento: "2025-01-01"
		})

		contaRepository.create({
			id: '123',
			nome: 'teste',
			tipo: "simulador",
			usuarioId: 'xyz',
			saldoInicial: 10.00,
			saldo: 10.00
		})

		const input: OperacaoDTO = {
			id: "012",
			ativoId: 'abc',
			contaId: '123',
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false,
		};
		operacaoRepository.create(input);
	});

	it('should edit operacao without precoSaida', async () => {
		const input: OperacaoDTO = {
			id: '012',
			ativoId: 'abc',
			contaId: '123',
			quantidade: 1,
			tipo: "venda",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data[0]).toEqual(input);
		expect(contaRepository.data[0].saldo).toEqual(10);
	});

	it('should edit operacao with precoSaida', async () => {
		const input: OperacaoDTO = {
			id: '012',
			ativoId: 'abc',
			contaId: '123',
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			precoSaida: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data[0]).toEqual(input);
		expect(contaRepository.data[0].saldo).toEqual(30);
	});

	it('should return 404 if user not found', async () => {
		const input: OperacaoDTO = {
			id: 'zzzz',
			ativoId: 'abc',
			contaId: '123',
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(404);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: OperacaoDTO = {
			id: 'zzz',
			ativoId: 'abc',
			contaId: '123',
			quantidade: 1,
			tipo: "teste",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(422);
	});

	it('should return 404 when conta not exist', async () => {
		const input: OperacaoDTO = {
			id: 'aaaaaaaaa',
			ativoId: "abc",
			contaId: "zzz",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(404)
	});

	it('should return 404 when ativo not exist', async () => {
		const input: OperacaoDTO = {
			id: 'aaaaaaaaa',
			ativoId: "zzz",
			contaId: "123",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: format(new Date(), 'yyyy-MM-dd'),
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(404)
	});

	it('should return 422 when dataEntrada is out if ativo expiration', async () => {
		const input: OperacaoDTO = {
			id: 'aaaaaaaaa',
			ativoId: "abc",
			contaId: "123",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: '2025-01-02',
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(422)
	});

	it('should return 422 when dataSaida is before dataEntrada', async () => {
		const input: OperacaoDTO = {
			id: 'aaaaaaaaa',
			ativoId: "abc",
			contaId: "123",
			quantidade: 1,
			tipo: "compra",
			precoEntrada: 10,
			stopLoss: 5,
			alvo: 20,
			dataEntrada: '2024-01-23 15:45',
			dataSaida: '2024-01-22 15:45',
			margem: 10,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await editOperacaoController({input, operacaoRepository, ativoRepository, contaRepository});
		expect(response.status).toEqual(422)
	});


	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await editOperacaoController(null);
		expect(response.status).toEqual(500);
	});

});
