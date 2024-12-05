import { describe, expect, it } from "vitest";
import path from "path";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { Ativo, Conta, Operacao } from "@/core/models";
import { importOperacoesByXlsController } from "@/application/controllers/operacao/import-operacoes-xls-controller";

describe('Import operacoes by xls', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();
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

	it('should import operacoes from xls file', async () => {
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, file: xlsFile});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data.length).toEqual(3)
	});

	it('should return 404 if not send file', async () => {
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, file: ''});
		expect(response.status).toEqual(404);
	});

	it('should return 422 if a field is invalid from xls file', async () => {
		const invalidXlsFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.csv');
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, file: invalidXlsFile});
		expect(response.status).toEqual(422);
	});

	it('should return 422 if a ativo is invalid from xls file', async () => {
		const invalidXlsFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-ativo.csv');
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, file: invalidXlsFile});
		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Ativo não encontrado.');
	});

	it('should return 422 if a conta is invalid from xls file', async () => {
		const invalidXlsFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-conta.csv');
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, file: invalidXlsFile});

		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Conta não encontrada.');
	});

	it('should return 500 if throw a error', async () => {
		//@ts-ignore
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository: null, file: csvFile});
		expect(response.status).toEqual(500);
	});

});
