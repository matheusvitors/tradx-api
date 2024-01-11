import { createAtivoController, listAtivosController } from '@/application/controllers/ativo';
import { route } from '@/infra/adapters/route';
import { ativosPrismaRepository } from '@/infra/database/prisma/ativos-prisma-repository';
import { Router, Request, Response} from 'express'

const router = Router();
const repository = ativosPrismaRepository;

router.get('/ativos', async (request: Request, response: Response) => {
	const responseData = await listAtivosController(repository);
	return route({ response, responseData});
})

router.get('/ativos/:id', async (request: Request, response: Response) => {
	const responseData = await listAtivosController(repository);
	return route({ response, responseData});
})

router.post('/ativos', async (request: Request, response: Response) => {
	const responseData = await createAtivoController({repository, input: {nome: request.body.nome, acronimo: request.body.acronimo}});
	return route({ response, responseData});
})

export { router as ativoRouter };
