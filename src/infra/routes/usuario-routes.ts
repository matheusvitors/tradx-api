import { Router, Request, Response } from "express";
import { route } from "@/infra/adapters/route";
import { getUsuarioController } from "@/application/controllers/usuario";
import { extractUserId } from "@/utils/extract-user-id";
import { serverError } from "@/infra/adapters/response-wrapper";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";

const router = Router();
const repository = usuarioRepository;

router.get(`/me`, async (request: Request, response: Response) => {
	try {
		const responseData = await getUsuarioController({
			repository,
			id: extractUserId(request.headers['authorization']?.split(' ')[1])
		});
		return route({ response, responseData });
	} catch (error) {
		console.log(error);
		return route({ response, responseData: serverError(error) })
	}
})

export { router as usuarioRoutes }
