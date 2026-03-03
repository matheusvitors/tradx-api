import { Router, Request, Response } from "express";
import { route } from "@/infra/adapters/route";
import { usuarioPrismaRepository } from "@/infra/database/prisma";
import { getUsuarioController, listUsuariosController } from "@/application/controllers/usuario";
import { extractUserId } from "@/utils/extract-user-id";

const router = Router();
const repository = usuarioPrismaRepository;

router.get(`/me`, async (request: Request, response: Response) => {
	const responseData = await getUsuarioController({
		repository,
		id: extractUserId(request.headers['authorization']?.split(' ')[1])
	});
	return route({ response, responseData });
})
