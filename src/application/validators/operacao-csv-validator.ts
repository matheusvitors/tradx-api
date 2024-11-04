import { z } from "zod";

export const operacaoCsvValidator = async (operacao: any): Promise<boolean> => {
	const operacaoFromCsvSchema = z.object({
		conta: z.string().min(2),
		ativo: z.string().min(2),
		quantidade: z.string().min(1),
		tipo: z.string().min(4),
		precoEntrada: z.string().min(2),
		precoSaida: z.string().min(2),
		dataEntrada: z.string().min(2),
		dataSaida: z.string().min(2),
		operacaoPerdida: z.string().min(2),
		operacaoErrada: z.string().min(2),
	})

	try {
		const validation = operacaoFromCsvSchema.safeParse(operacao);
		return validation.success;
	} catch (error) {
		throw error;
	}
}
