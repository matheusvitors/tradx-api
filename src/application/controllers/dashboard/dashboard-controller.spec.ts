import { dashboardController } from "@/application/controllers/dashboard/dashboard-controller";
import { Conta, Operacao } from "@/core/models";
import { InMemoryRepository } from "@/infra/database/InMemoryRepository";
import { inspect } from "util";
import { beforeAll, describe, expect, it } from "vitest";

describe("Dashboard Controller", () => {
	const operacaoRepository = new InMemoryRepository<Operacao>();

	beforeAll(() => {
		const operacoes: Operacao[] = [
			{
				id: "01917ba5-42f3-7379-8391-4bdbb1cea814",
				ativo: {
					id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
					nome: "Mais uma",
					acronimo: "MAUM1",
					tipo: "indice",
					multiplicador: 4.5,
				},
				contaId: 'abc',
				conta: {
					id: "abc",
					nome: "Simulador",
					tipo: "simulador",
					usuario: {
						id: '101',
						nome: "João Silva",
						email: "joao.silva@example.com",
						username: "a",
						password: "1",
					},
					saldo: 3073,
					saldoInicial: 0,
				},
				quantidade: 1,
				tipo: "compra",
				precoEntrada: 10,
				stopLoss: 5,
				alvo: 20,
				precoSaida: 20,
				dataEntrada: new Date( "2024-08-22 14:50"),
				dataSaida: new Date("2024-08-22 15:50"),
				margem: 20,
				operacaoPerdida: false,
				operacaoErrada: false,
			},
			{
				id: "0190e5d5-bf96-7ff2-8e39-6bcdc0dbf773",
				ativo: {
					id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
					nome: "Mais uma",
					acronimo: "MAUM1",
					tipo: "indice",
					multiplicador: 4.5,
				},
				contaId: 'abc',
				conta: {
					id: "abc",
					nome: "Simulador",
					tipo: "simulador",
					usuario: {
						id: '101',
						nome: "João Silva",
						email: "joao.silva@example.com",
						username: "a",
						password: "1",
					},
					saldo: 3073,
					saldoInicial: 0,
				},
				quantidade: 1,
				tipo: "compra",
				precoEntrada: 10,
				stopLoss: 5,
				alvo: 30,
				precoSaida: 30,
				dataEntrada: new Date("2024-08-24 16:40"),
				dataSaida: new Date("2024-08-24 16:45"),
				margem: 20,
				operacaoPerdida: false,
				operacaoErrada: false,
			},
			{
				id: "0190effd-53c3-794e-916b-ad27477ff429",
				ativo: {
					id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
					nome: "Mais uma",
					acronimo: "MAUM1",
					tipo: "indice",
					multiplicador: 4.5,
				},
				contaId: 'abc',
				conta: {
					id: "abc",
					nome: "Simulador",
					tipo: "simulador",
					usuario: {
						id: '101',
						nome: "João Silva",
						email: "joao.silva@example.com",
						username: "a",
						password: "1",
					},
					saldo: 3073,
					saldoInicial: 0,
				},
				quantidade: 1,
				tipo: "compra",
				precoEntrada: 5,
				stopLoss: 1,
				alvo: 10,
				precoSaida: 5,
				dataEntrada: new Date("2024-08-23 09:00"),
				dataSaida: new Date("2024-08-23 14:00"),
				margem: 10,
				operacaoPerdida: false,
				operacaoErrada: false,
			},
			{
				id: "0190effd-e656-73c3-b612-afb6b507d281",
				ativo: {
					id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
					nome: "Mais uma",
					acronimo: "MAUM1",
					tipo: "indice",
					multiplicador: 4.5,
					dataVencimento: undefined,
				},
				contaId: 'abc',
				conta: {
					id: "abc",
					nome: "Simulador",
					tipo: "simulador",
					usuario: {
						id: '101',
						nome: "João Silva",
						email: "joao.silva@example.com",
						username: "a",
						password: "1",
					},
					saldo: 3073,
					saldoInicial: 0,
				},
				quantidade: 1,
				tipo: "compra",
				precoEntrada: 10,
				stopLoss: 5,
				alvo: 20,
				dataEntrada: new Date("2024-08-19 12:40"),
				margem: 20,
				operacaoPerdida: false,
				operacaoErrada: false,
			},
			{
				id: "0190effd-e656-73c3-b612-afb6b507d281",
				ativo: {
					id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
					nome: "Mais uma",
					acronimo: "MAUM1",
					tipo: "indice",
					multiplicador: 4.5,
					dataVencimento: undefined,
				},
				contaId: 'abc',
				conta: {
					id: "abc",
					nome: "Simulador",
					tipo: "simulador",
					usuario: {
						id: '101',
						nome: "João Silva",
						email: "joao.silva@example.com",
						username: "a",
						password: "1",
					},
					saldo: 3073,
					saldoInicial: 0,
				},
				quantidade: 1,
				tipo: "compra",
				precoEntrada: 10,
				stopLoss: 5,
				alvo: 20,
				precoSaida: 5,
				dataEntrada: new Date("2024-08-19 12:40"),
				dataSaida: new Date("2024-08-19 14:40"),
				margem: 20,
				operacaoPerdida: false,
				operacaoErrada: false,
			},
			{
				id: "0190effd-e656-73c3-b612-afb6b507d281",
				ativo: {
					id: "0190e5d3-8793-7a04-82f1-f747220c6a46",
					nome: "Mais uma",
					acronimo: "MAUM1",
					tipo: "indice",
					multiplicador: 4.5,
					dataVencimento: undefined,
				},
				contaId: 'abc',
				conta: {
					id: "abc",
					nome: "Simulador",
					tipo: "simulador",
					usuario: {
						id: '101',
						nome: "João Silva",
						email: "joao.silva@example.com",
						username: "a",
						password: "1",
					},
					saldo: 3073,
					saldoInicial: 0,
				},
				quantidade: 1,
				tipo: "compra",
				precoEntrada: 30,
				stopLoss: 15,
				alvo: 50,
				precoSaida: 15,
				dataEntrada: new Date("2024-08-19 12:40"),
				dataSaida: new Date("2024-08-19 16:40"),
				margem: 20,
				operacaoPerdida: false,
				operacaoErrada: false,
			},
		];

		operacoes.forEach((operacao) => operacaoRepository.create(operacao));
	});

	it("should list informations", async () => {
		const response = await dashboardController({  operacaoRepository, contaId: "abc" });

		expect(response.status).toEqual(200);
		expect(response.body.content.conta.saldo).toEqual(45);
		expect(response.body.content.conta.ganhos).toEqual(135);
		expect(response.body.content.conta.perdas).toEqual(90);
		expect(response.body.content.variacao[response.body.content.variacao.length - 1].value).toEqual(45);
		expect(response.body.content.operacoes.length).toEqual(1);
	});

	it("should return 422 if not have contaId", async () => {
		const response = await dashboardController({  operacaoRepository, contaId: "" });
		expect(response.status).toEqual(422);
	});

	it("should return 500 if have error server", async () => {
		//@ts-ignore
		const response = await dashboardController({  operacaoRepository: null, contaId: "1" });
		expect(response.status).toEqual(500);
	});
});
