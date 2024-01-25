import { Router, Request, Response } from "express";
import { route } from "@/infra/adapters/route";
import { usuarioPrismaRepository } from "@/infra/database/prisma";
import { getUsuarioController, listUsuariosController } from "@/application/controllers/usuario";

const router = Router();
const repository = usuarioPrismaRepository;
const path = '/usuarios'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listUsuariosController(repository);
	return route({ response, responseData });
})

router.get(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await getUsuarioController({
		repository,
		id: request.params.id
	});
	return route({ response, responseData });
})
