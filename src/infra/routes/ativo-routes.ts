import { Router, Request, Response} from 'express'
import { route } from '@/infra/adapters/route';
import { ativoRepository } from '@/infra/database/repositories';
import { RequestParams } from '@/application/interfaces';
import { Ativo } from '@/core/models';
import { createController, editController, getController, listController, removeController } from '@/application/controllers/generic';
import { AtivoDTO } from '@/application/dto';
import { validateAtivo } from '@/core/validators';

const router = Router();
const repository = ativoRepository;


router.get('/ativos', async (request: Request, response: Response) => {
	const responseData = await listController<Ativo, Ativo>(repository);
	return route({ response, responseData });
})

router.get('/ativos/:id', async (request: Request<RequestParams>, response: Response) => {
	const responseData = await getController<Ativo, Ativo>({repository, id: request.params.id});
	return route({ response, responseData });
})

router.post('/ativos', async (request: Request, response: Response) => {

	const input: AtivoDTO = {
		nome: request.body.nome,
		acronimo: request.body.acronimo,
		tipo: request.body.tipo,
		multiplicador: request.body.multiplicador,
		dataVencimento: request.body.dataVencimento ? new Date(request.body.dataVencimento) : undefined
	}

	const responseData = await createController<Ativo, AtivoDTO>({
		repository,
		input,
		validate: validateAtivo,
		uniqueFields: ['acronimo']
	});
	return route({ response, responseData });
})

router.put('/ativos', async (request: Request, response: Response) => {

	const input = {
		id: request.body.id,
		nome: request.body.nome,
		acronimo: request.body.acronimo,
		tipo: request.body.tipo,
		multiplicador: request.body.multiplicador,
		dataVencimento: request.body.dataVencimento ? new Date(request.body.dataVencimento) : undefined
	}

	const responseData = await editController<Ativo, AtivoDTO>({
		repository,
		input,
		validate: validateAtivo,
		uniqueFields: ['acronimo']
	});
	return route({ response, responseData });
})

router.delete('/ativos/:id', async (request: Request<RequestParams>, response: Response) => {
	const responseData = await removeController<Ativo>({repository, id: request.params.id});
	return route({ response, responseData });
})

export { router as ativoRouter };
