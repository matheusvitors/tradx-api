import { dashboardController } from '@/application/controllers/dashboard';
import { unprocessableEntity } from '@/infra/adapters/response-wrapper';
import { route } from '@/infra/adapters/route';
import { contaPrismaRepository, operacaoPrismaRepository } from '@/infra/database/prisma';
import { Router, Request, Response} from 'express'

const router = Router();
const path = '/dashboard';
const contaRepository = contaPrismaRepository;
const operacaoRepository = operacaoPrismaRepository;

router.get(`${path}/:conta`, async (request: Request, response: Response) => {
	const responseData = await dashboardController({ contaRepository, operacaoRepository, contaId: request.params.conta });
	return route({ response, responseData });
})

export { router as DashboardRoutes}
