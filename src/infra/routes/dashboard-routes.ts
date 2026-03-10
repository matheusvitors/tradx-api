import { dashboardController } from '@/application/controllers/dashboard';
import { route } from '@/infra/adapters/route';
import { operacaoRepository } from '@/infra/database/repositories';
import { Router, Request, Response} from 'express'

const router = Router();
const path = '/dashboard';
const repository = operacaoRepository;

router.get(`${path}/:conta`, async (request: Request, response: Response) => {
	const responseData = await dashboardController({ repository, contaId: request.params.conta });
	return route({ response, responseData });
})

export { router as DashboardRoutes}
