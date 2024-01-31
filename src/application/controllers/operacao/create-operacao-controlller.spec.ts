import { createOperacaoController } from "@/application/controllers/operacao";
import { OperacaoDTO } from "@/application/dto";
import { Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { describe, expect, it } from "vitest";

describe('Create Operacao Controller', () => {
	const repository = new InMemoryRepository<Operacao>();

	it('should create a operacao', async () => {
		const input: OperacaoDTO = {
			id: "",
			ativoId: "",
			contaId: "",
			quantidade: 0,
			tipo: "",
			precoEntrada: 0,
			stopLoss: 0,
			alvo: 0,
			dataEntrada: undefined,
			margem: 0,
			operacaoPerdida: false,
			operacaoErrada: false
		}

		const response = await createOperacaoController({input, repository});
		expect(response.status).toEqual(200);
	});

	it('should return 422 when pass invalid data', async () => {
		const input = {
			id: 'abc',
			nome: 't',
			tipo: "simulador",
			usuarioId: 'xyz',
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
