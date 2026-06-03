import { Router, Request, Response, response} from 'express'
import { route } from '@/infra/adapters/route';
import { extractUserId } from '@/utils/extract-user-id';
import { contaRepository, usuarioRepository } from '@/infra/database/repositories';
import { RequestParams } from '@/application/interfaces';
import { Conta } from '@/core/models';
import { createController, editController, getController, listController, removeController } from '@/application/controllers/generic';
import { ContaDTO } from '@/application/dto';
import { validateConta } from '@/core/validators';

const router = Router();
const repository = contaRepository;
const path = '/contas'

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listController<Conta, ContaDTO>(repository);
	return route({ response, responseData });
});

router.get(`${path}/:id`, async (request: Request<RequestParams>, response: Response) => {
	const responseData = await getController<Conta, ContaDTO>({
		repository,
		id: request.params.id,
		owner:{
			field: 'usuarioId',
			id: extractUserId(request.headers['authorization']?.split(' ')[1])
		}
	});
	return route({ response, responseData });
});

router.post(`${path}`, async (request: Request, response: Response) => {
	const input = {
		nome: request.body.nome,
		tipo: request.body.tipo,
		saldoInicial: parseFloat(request.body.saldoInicial),
		usuarioId: extractUserId(request.headers['authorization']?.split(' ')[1])
	}

	const responseData = await createController<Conta, ContaDTO>({
		input,
		repository,
		validate: validateConta,
		relations:[{
			id: input.usuarioId,
			repository: usuarioRepository,
			errorMessage: "Usuário não encontrado!"
		}]
	});

	return route({ response, responseData });
});

router.put(`${path}`, async (request: Request, response: Response) => {
	const input: ContaDTO & { id: string; }  = {
		id: request.body.id,
		nome: request.body.nome,
		tipo: request.body.tipo,
		saldoInicial: parseFloat(request.body.saldoInicial),
		usuarioId: extractUserId(request.headers['authorization']?.split(' ')[1])
	}

	const responseData = await editController<Conta, ContaDTO>({
		input,
		repository,
		validate: validateConta,
		relations:[{
			id: input.usuarioId!,
			repository: usuarioRepository,
			errorMessage: "Usuário não encontrado!"
		}],
		owner:{
			field: 'usuarioId',
			id: extractUserId(request.headers['authorization']?.split(' ')[1])
		}
	});
	return route({ response, responseData });
})

router.delete(`${path}/:id`, async (request: Request<RequestParams>, response: Response) => {
	const responseData = await removeController<Conta, ContaDTO>({
		repository,
		id: request.params.id,
		owner:{
			field: 'usuarioId',
			id: extractUserId(request.headers['authorization']?.split(' ')[1])
		}
	});
	return route({ response, responseData });
})

export { router as ContaRoutes };
