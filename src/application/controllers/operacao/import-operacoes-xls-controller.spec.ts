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
		id: 'xyz',
		nome: 'Real',
		tipo: "real",
		usuarioId: 'xyz',
		saldoInicial: 0.00,
		saldo: 0.00,
	})

	ativoRepository.create({
		id: "abc",
		nome: "Indice",
		acronimo: "WING25",
		tipo: "indice",
		dataVencimento: '2026-01-01',
		multiplicador: 0.2
	})

	ativoRepository.create({
		id: "def",
		nome: "Dolar",
		acronimo: "WDON24",
		tipo: "indice",
		dataVencimento: '2025-01-01',
		multiplicador: 10
	})

	it('should import operacoes from xls file', async () => {
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'xyz', file: xlsFile});
		expect(response.status).toEqual(200);
		expect(operacaoRepository.data.length).toEqual(6);
		expect(contaRepository.data[0].saldo).toEqual(476)
	});

	it('should return 404 if not send file', async () => {
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'xyz', file: ''});
		expect(response.status).toEqual(404);
	});

	it('should return 422 if a field is invalid from xls file', async () => {
		const invalidXlsFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.xlsx');
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'xyz', file: invalidXlsFile});
		expect(response.status).toEqual(422);
	});

	it('should return 422 if a ativo is invalid from xls file', async () => {
		const invalidXlsFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid-ativo.xlsx');
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, contaId: 'xyz', file: invalidXlsFile});
		expect(response.status).toEqual(422);
		expect(response.body.message).toEqual('Há ativos inexistentes no arquivo enviado.');
	});

	it('should return 404 if a conta is invalid ', async () => {
		const response = await importOperacoesByXlsController({ operacaoRepository, ativoRepository, contaRepository, contaId: '', file: xlsFile});

		expect(response.status).toEqual(404);
		expect(response.body.message).toEqual('Conta não encontrada.');
	});

	it('should return 500 if throw a error', async () => {
		//@ts-ignore
		const response = await importOperacoesByXlsController({ operacaoRepository, contaId: 'xyz', file: xlsFile});
		expect(response.status).toEqual(500);
	});
});
