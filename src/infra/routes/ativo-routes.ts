import { Router, Request, Response} from 'express'
import { createAtivoController, editAtivoController, getAtivoController, listAtivosController, removeAtivoController } from '@/application/controllers/ativo';
import { route } from '@/infra/adapters/route';
import { ativoRepository } from '@/infra/database/repositories';
import { RequestParams } from '@/application/interfaces';

const router = Router();
const repository = ativoRepository;


router.get('/ativos', async (request: Request, response: Response) => {
	const responseData = await listAtivosController(repository);
	return route({ response, responseData });
})

router.get('/ativos/:id', async (request: Request<RequestParams>, response: Response) => {
	const responseData = await getAtivoController({repository, id: request.params.id});
	return route({ response, responseData });
})

router.post('/ativos', async (request: Request, response: Response) => {
	const responseData = await createAtivoController({repository, input: {
		nome: request.body.nome,
		acronimo: request.body.acronimo,
		tipo: request.body.tipo,
		multiplicador: request.body.multiplicador,
		dataVencimento: request.body.dataVencimento ? new Date(request.body.dataVencimento) : undefined
	}});
	return route({ response, responseData });
})

router.put('/ativos', async (request: Request, response: Response) => {
	const responseData = await editAtivoController({repository, input: {
		id: request.body.id,
		nome: request.body.nome,
		acronimo: request.body.acronimo,
		tipo: request.body.tipo,
		multiplicador: request.body.multiplicador,
		dataVencimento: request.body.dataVencimento
	}});
	return route({ response, responseData });
})

router.delete('/ativos/:id', async (request: Request<RequestParams>, response: Response) => {
	const responseData = await removeAtivoController({repository, id: request.params.id});
	return route({ response, responseData });
})


export { router as ativoRouter };
