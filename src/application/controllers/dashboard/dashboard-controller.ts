import { ResponseData } from "@/application/interfaces";
import { serverError, success } from "@/infra/adapters/response-wrapper";

export const dashboardController = async (): Promise<ResponseData> => {
	try {
		return success({
			contas: [],
			relatorio: [],
			operacoes: []
		})
	} catch (error) {
		return serverError(error);
	}
}
