import { dashboardController } from '@/application/controllers/dashboard';
import { route } from '@/infra/adapters/route';
import { operacaoPrismaRepository } from '@/infra/database/prisma';
import { Router, Request, Response} from 'express'

const router = Router();
const path = '/dashboard';
const operacaoRepository = operacaoPrismaRepository;

router.get(`${path}/:conta`, async (request: Request, response: Response) => {
	const responseData = await dashboardController({ operacaoRepository, contaId: request.params.conta });
	return route({ response, responseData });
})

export { router as DashboardRoutes}
