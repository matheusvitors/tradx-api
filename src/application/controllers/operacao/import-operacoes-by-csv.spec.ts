import { describe, it } from "vitest";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { Operacao, Ativo, Conta } from "@prisma/client";

describe('Name of the group', () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();
	const ativoRepository = new InMemoryRepository<Ativo>();
	const contaRepository = new InMemoryRepository<Conta>();

	it('should import operacoes from csv file', () => {

	});

	it('should return 404 if not send file', () => {

	});

	it('should return 422 if a field is invalid', () => {

	});

	it('should return 500 if throw a error', () => {

	});

});
