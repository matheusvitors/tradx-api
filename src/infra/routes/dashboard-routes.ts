import { dashboardController } from '@/application/controllers/dashboard';
import { route } from '@/infra/adapters/route';
import { Router, Request, Response} from 'express'

const router = Router();
const path = '/dashboard'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await dashboardController();
	return route({ response, responseData});
})
