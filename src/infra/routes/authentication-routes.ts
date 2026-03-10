import { Request, Response, Router } from "express";
import { route } from "@/infra/adapters/route";
import { authenticationController } from "@/application/controllers/authentication/authentication-controller";
import { usuarioRepository } from "@/infra/database/repositories";

const router = Router();
const repository = usuarioRepository;

router.post('/login', async (request: Request, response: Response) => {
	const responseData = await authenticationController({
		repository,
		username: request.body.username,
		password: request.body.password,
	});
	return route({ response, responseData });

})

export { router as AuthenticationRoutes };
