import { Router, Request, Response} from 'express'
import { contaPrismaRepository } from '@/infra/database/prisma';
import { route } from '@/infra/adapters/route';
import { createContaController, editContaController, getContaController, listContasController, removeContaController } from '@/application/controllers/conta';
import { extractUserId } from '@/utils/extract-user-id';

const router = Router();
const repository = contaPrismaRepository;
const path = '/contas'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listContasController(repository);
	return route({ response, responseData });
});

router.get(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await getContaController({repository, id: request.params.id});
	return route({ response, responseData });
});

router.post(`${path}`, async (request: Request, response: Response) => {
	console.log(request.headers['authorization']?.split(' ')[1]);

	const responseData = await createContaController({repository, input: {
		nome: request.body.nome,
		tipo: request.body.tipo,
		usuarioId: extractUserId(request.headers['authorization']?.split(' ')[1])
	}});
	return route({ response, responseData });
});

router.put('/ativos', async (request: Request, response: Response) => {
	const responseData = await editContaController({repository, input: {
		id: request.body.id,
		nome: request.body.nome,
		tipo: request.body.tipo,
		usuarioId: extractUserId(request.headers['authorization']?.split(' ')[1])
	}});
	return route({ response, responseData });
})

router.delete('/ativos/:id', async (request: Request, response: Response) => {
	const responseData = await removeContaController({repository, id: request.params.id});
	return route({ response, responseData });
})

export { router as ContaRoutes };
