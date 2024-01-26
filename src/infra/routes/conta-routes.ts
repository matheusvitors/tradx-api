import { Router, Request, Response} from 'express'
import { contaPrismaRepository } from '@/infra/database/prisma';
import { route } from '@/infra/adapters/route';
import { listContasController } from '@/application/controllers/conta';

const router = Router();
const repository = contaPrismaRepository;
const path = '/contas'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listContasController(repository);
	return route({ response, responseData });
})

export { router as ContaRoutes };
