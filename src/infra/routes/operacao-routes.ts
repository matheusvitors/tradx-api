import { Router, Request, Response} from 'express'
import { operacaoPrismaRepository } from '@/infra/database/prisma';
import { route } from '@/infra/adapters/route';
import { createOperacaoController, listOperacaoController } from '@/application/controllers/operacao';

const router = Router();
const repository = operacaoPrismaRepository;
const path = '/operacoes'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listOperacaoController(repository);
	return route({ response, responseData });
})

router.get(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await listOperacaoController(repository);
	return route({ response, responseData });
})

router.post(`${path}`, async (request: Request, response: Response) => {
	const responseData = await createOperacaoController({repository, input: {
		ativoId: request.body.ativoId,
		quantidade: request.body.quantidade,
		tipo: request.body.tipo,
		precoEntrada: request.body.precoEntrada,
		stopLoss: request.body.stopLoss,
		alvo: request.body.alvo,
		precoSaida: request.body.precoSaida,
		dataEntrada: request.body.dataEntrada,
		dataSaida: request.body.dataSaida,
		margem: request.body.margem,
		operacaoPerdida: request.body.operacaoPerdida,
		operacaoErrada: request.body.operacaoErrada
	}});
	return route({ response, responseData });
})


export { router as OperacaoRoutes };
