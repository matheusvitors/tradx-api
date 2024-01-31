import { Router, Request, Response} from 'express'
import { operacaoPrismaRepository } from '@/infra/database/prisma';
import { route } from '@/infra/adapters/route';
import { createOperacaoController, editOperacaoController, getOperacaoController, listOperacaoController, removeOperacaoController } from '@/application/controllers/operacao';

const router = Router();
const repository = operacaoPrismaRepository;
const path = '/operacoes'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listOperacaoController(repository);
	return route({ response, responseData });
})

router.get(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await getOperacaoController({repository, id: request.params.id});
	return route({ response, responseData });
})

router.post(`${path}`, async (request: Request, response: Response) => {
	const responseData = await createOperacaoController({repository, input: {
		ativoId: request.body.ativoId,
		contaId: request.body.contaId,
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

router.put(`${path}`, async (request: Request, response: Response) => {
	const responseData = await editOperacaoController({repository, input: {
		id: request.body.id,
		ativoId: request.body.ativoId,
		contaId: request.body.contaId,
		quantidade: request.body.quantidade,
		tipo: request.body.tipo,
		precoEntrada: request.body.precoEntrada,
		stopLoss: request.body.stopLoss,
		alvo: request.body.alvo,
		precoSaida: request.body.precoSaida,
		dataEntrada: new Date(request.body.dataEntrada),
		dataSaida: new Date(request.body.dataSaida),
		margem: request.body.margem,
		operacaoPerdida: request.body.operacaoPerdida,
		operacaoErrada: request.body.operacaoErrada
	}});
	return route({ response, responseData });
})


router.delete(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await removeOperacaoController({repository, id: request.params.id});
	return route({ response, responseData });
})


export { router as OperacaoRoutes };
