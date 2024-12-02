import { describe, expect, it } from "vitest";
import path from "path";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { importOperacoesByCsvController } from "@/application/controllers/operacao/import-operacoes-controller";
import { Ativo, Conta, Operacao } from "@/core/models";

describe('Import operacoes', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();
	const csvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste.csv');
	const xlsFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste.xlsx');

	contaRepository.create({
		id: 'abc',
		nome: 'Real',
		tipo: "real",
		usuarioId: 'xyz',
		saldoInicial: 0.00,
		saldo: 0.00,
	})

	ativoRepository.create({
		id: "abc",
		nome: "Teste",
		acronimo: "WINQ24",
		tipo: "indice",
		dataVencimento: '2025-01-01',
	})

	it('should import operacoes from csv file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: csvFile});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data.length).toEqual(3)
	});

	it('should return 404 if not send file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: ''});
		expect(response.status).toEqual(404);
	});

	it('should return 422 if a field is invalid from csv file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: invalidCsvFile});
		expect(response.status).toEqual(422);
	});

	it('should return 422 if a ativo is invalid from csv file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-ativo.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: invalidCsvFile});
		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Ativo não encontrado.');
	});

	it('should return 422 if a conta is invalid from csv file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-conta.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: invalidCsvFile});

		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Conta não encontrada.');
	});

	it('should import operacoes from xls file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: xlsFile});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data.length).toEqual(3)
	});

	it('should return 422 if a field is invalid from xls file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.xlsx');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: invalidCsvFile});
		expect(response.status).toEqual(422);
	});

	it('should return 422 if a ativo is invalid from xls file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-ativo.xlsx');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: invalidCsvFile});
		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Ativo não encontrado.');
	});

	it('should return 422 if a conta is invalid from xls file', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-conta.xlsx');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, file: invalidCsvFile});

		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Conta não encontrada.');
	});

	it('should return 500 if throw a error', async () => {
		//@ts-ignore
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository: null, file});
		expect(response.status).toEqual(500);
	});

});
