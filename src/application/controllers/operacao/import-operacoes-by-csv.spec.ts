import { describe, it } from "vitest";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { Operacao, Ativo, Conta } from "@prisma/client";
import { importOperacoesByCsv } from "@/application/controllers/operacao/import-operacoes-by-csv";

describe('Import operacoes by CSV', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();

	it('should import operacoes from csv file', async () => {
		await importOperacoesByCsv({ operacaoRepository, ativoRepository, contaRepository})
	});

	it('should return 404 if not send file', () => {

	});

	it('should return 422 if a field is invalid', () => {

	});

	it('should return 500 if throw a error', () => {

	});

});
