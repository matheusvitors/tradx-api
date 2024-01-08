import { Router, Request, Response } from "express";
import project from '../package.json';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
	return response.status(200).send({
		name: 'Tradx',
		version: project.version
	});
})

export { routes }
