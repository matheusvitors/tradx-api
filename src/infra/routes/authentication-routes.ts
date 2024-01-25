import { Request, Response, Router } from "express";
import { route } from "@/infra/adapters/route";
import { serverError, success, unauthorized } from "@/infra/adapters/response-wrapper";
import { PASSWORD, NICKNAME } from "@/infra/config/constants";
import { jwt } from "@/infra/adapters/jwt";


const router = Router();

router.post('/login', async (request: Request, response: Response) => {
	const { username, password } = request.body;

	try {
		if(NICKNAME !== username || PASSWORD !== password) {
			return route({ response, responseData: unauthorized() });
		}

		const token = jwt.encode({payload: {auth: true}});

		return route({ response, responseData: success({token}) });
	} catch (error) {
		return route({ response, responseData: serverError(error) });
	}

})

export { router as AuthenticationRoutes };
