import { describe, expect, it } from "vitest";
import path from "path";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { importOperacoesByCsvController } from "@/application/controllers/operacao/import-operacoes-by-csv-controller";
import { Ativo, Conta, Operacao } from "@/core/models";
import { validateOperacoesCsv } from "@/application/usecases/operacao/validate-operacoes-csv";

describe('Validade operacoes of CSV file', () => {
	const csvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste.csv');

	it('should return true if informations of csv file is valid', async () => {
		const result = await validateOperacoesCsv(csvFile);
		expect(result).toBeTruthy();
	});

	it('should return false if a field is null or undefined', async () => {
		const invalidCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'operacoes-teste-invalid.csv');
		const result = await validateOperacoesCsv(invalidCsvFile);
		expect(result).toBeFalsy();
	});

	it('should return false if file not exist', async () => {
		const inexistentCsvFile = path.resolve(__dirname, '../', '../', '../', '../', 'tests', 'assets', 'nao-exite.csv');
		const result = await validateOperacoesCsv(inexistentCsvFile);
		expect(result).toBeFalsy();
	});

});
