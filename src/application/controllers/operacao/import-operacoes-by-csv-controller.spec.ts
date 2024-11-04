import { describe, expect, it } from "vitest";
import path from "path";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { importOperacoesByCsvController } from "@/application/controllers/operacao/import-operacoes-by-csv-controller";
import { Ativo, Conta, Operacao } from "@/core/models";

describe('Import operacoes by CSV', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();
	const csvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste.csv');

	it('should import operacoes from csv file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, csvFile});
		expect(response.status).toEqual(200);
	});

	it('should return 404 if not send file', async () => {
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, csvFile: ''});
		expect(response.status).toEqual(422);
	});

	it('should return 422 if a field is invalid', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.csv');
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, csvFile: invalidCsvFile});
		expect(response.status).toEqual(422);
	});

	it('should return 500 if throw a error', async () => {
		//@ts-ignore
		const response = await importOperacoesByCsvController({ operacaoRepository, ativoRepository, contaRepository, csvFile: null});
		expect(response.status).toEqual(500);
	});

});
