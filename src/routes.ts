import { Router, Request, Response } from "express";
import project from '../package.json';
import * as appRoutes from '@/infra/routes';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
	return response.status(200).send({
		name: 'Tradx',
		version: project.version
	});
});

routes.use(Object.values(appRoutes))


export { routes }
