import { Router, Request, Response } from "express";
import { route } from "@/infra/adapters/route";
import { extractUserId } from "@/utils/extract-user-id";
import { serverError } from "@/infra/adapters/response-wrapper";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";
import { getController } from "@/application/controllers/generic";
import { Usuario } from "@/core/models";

const router = Router();
const repository = usuarioRepository;

router.get(`/me`, async (request: Request, response: Response) => {
	try {
		const responseData = await getController<Usuario, Usuario>({
			repository,
			id: extractUserId(request.headers['authorization']?.split(' ')[1])
		});
		return route({ response, responseData });
	} catch (error) {
		console.error(error);
		return route({ response, responseData: serverError(error) })
	}
})

export { router as usuarioRoutes }
