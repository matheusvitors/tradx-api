import { describe, expect, it } from "vitest";
import path from "path";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { importOperacoesByCsvController } from "@/application/controllers/operacao/import-operacoes-csv-controller";
import { Ativo, Conta, Operacao } from "@/core/models";

describe('Import operacoes', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();
	const csvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste.csv');

	contaRepository.create({
		id: 'abc',
		nome: 'Simulador',
		tipo: "simulador",
		usuarioId: 'xyz',
		saldoInicial: 0.00,
		saldo: 0.00,
	})

	ativoRepository.create({
		id: "abc",
		nome: "Teste",
		acronimo: "WING25",
		tipo: "indice",
		dataVencimento: '2026-01-01',
		multiplicador: 0.2
	})

	it('should import operacoes from csv file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'abc', file: csvFile});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data.length).toEqual(6);
		expect(contaRepository.data[0].saldo).toEqual(476)
	});

	it('should return 404 if not send file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'abc', file: ''});
		expect(response.status).toEqual(404);
	});

	it('should return 422 if a field is invalid from csv file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'abc', file: invalidCsvFile});
		expect(response.status).toEqual(422);
	});

	it('should return 422 if date field is invalid from csv file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-date.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'abc', file: invalidCsvFile});
		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Formato de data inválida.');
	});

	it('should return 422 if a ativo is invalid from csv file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-ativo.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'abc', file: invalidCsvFile});
		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Ativo não encontrado.');
	});

	it('should return 404 if a conta is invalid from csv file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, contaId: '', file: csvFile});

		expect(response.status).toEqual(404);
		expect(response.body.message).toEqual('Conta não encontrada.');
	});

	it('should return 500 if throw a error', async () => {
		//@ts-ignore
		const response = await importOperacoesByCsvController({ operacaoRepository, file: csvFile});
		expect(response.status).toEqual(500);
	});

});
