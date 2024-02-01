import { createOperacaoController } from "@/application/controllers/operacao";
import { OperacaoDTO } from "@/application/dto";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Create Operacao Controller', () => {
	const repository = new InMemoryRepository<Operacao>();

	it('should create a operacao', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "aaa",
			contaId: "ccc",
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

		const response = await createOperacaoController({input, repository});
		expect(response.status).toEqual(200);
	});

	it('should return 422 when pass invalid data', async () => {
		const input: Omit<OperacaoDTO, 'id'> = {
			ativoId: "aaa",
			contaId: "ccc",
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

		const response = await createOperacaoController({repository, input});
		expect(response.status).toEqual(422)
	});

	it('should return 500 if have error server', async () => {
		//@ts-ignore
		const response = await createOperacaoController(null);
		expect(response.status).toEqual(500)
	});
})
