import { Router, Request, Response} from 'express'
import multer, { MulterError } from 'multer';
import { route } from '@/infra/adapters/route';
import {  importOperacoesByCsvController, importOperacoesByXlsController, listOperacaoByContaController } from '@/application/controllers/operacao';
import { notFound } from '@/infra/adapters/response-wrapper';
import path from 'path';
import { RequestParams, ResponseData } from '@/application/interfaces';
import { ativoRepository, contaRepository, operacaoRepository, regraEntradaRepository } from '@/infra/database/repositories';
import { createController, editController, getController, listController, removeController } from '@/application/controllers/generic';
import { Operacao } from '@/core/models';
import { OperacaoDTO } from '@/application/dto';
import { validateOperacao } from '@/core/validators';

interface OperacaoRequestParams {
	id: string;
	init: string;
	end: string;
}

const router = Router();
const repository = operacaoRepository;
const defaultPath = '/operacoes';

const storage = multer.diskStorage({
	destination: function (request, file, callback) {
		callback(null, 'temp/');
	},
	filename: function (request, file, callback) {
		const extension = file.originalname.split('.');
		callback(null, `operacoes.${extension[1]}`);
	},
})

const upload = multer({storage});

router.get(`${defaultPath}`, async (request: Request, response: Response) => {
	const responseData = await listController<Operacao, OperacaoDTO>(repository);
	return route({ response, responseData });
})

router.get(`${defaultPath}/conta/:id/range/:init/:end`, async (request: Request<OperacaoRequestParams>, response: Response) => {
	const responseData = await listOperacaoByContaController({repository, contaId: request.params.id, range: {init: request.params.init, end: request.params.end}});
	return route({ response, responseData });
})

router.get(`${defaultPath}/:id`, async (request: Request<RequestParams>, response: Response) => {
	const responseData = await getController<Operacao, OperacaoDTO>({repository, id: request.params.id});
	return route({ response, responseData });
})

router.post(`${defaultPath}`, async (request: Request, response: Response) => {
	const responseData = await createController<Operacao, OperacaoDTO>({
		repository,
		input: {
			ativoId: request.body.ativoId,
			contaId: request.body.contaId,
			regraEntradaId: request.body.regraEntradaId,
			quantidade: request.body.quantidade,
			tipo: request.body.tipo,
			precoEntrada: request.body.precoEntrada,
			stopLoss: request.body.stopLoss,
			alvo: request.body.alvo,
			precoSaida: request.body.precoSaida,
			dataEntrada: request.body.dataEntrada,
			dataSaida: request.body.dataSaida,
			operacaoPerdida: request.body.operacaoPerdida,
			operacaoErrada: request.body.operacaoErrada
		},
		validate: validateOperacao,
		relations: [
			{
				id: request.body.ativoId,
				repository: ativoRepository,
				errorMessage: 'Ativo não encontrado.'
			},
			{
				id: request.body.contaId,
				repository: contaRepository,
				errorMessage: 'Conta não encontrada.'
			},
			{
				id: request.body.regraEntradaId,
				repository: regraEntradaRepository,
				errorMessage: 'Regra não encontrada.'
			},
		]
	});
	return route({ response, responseData });
})

router.post(`${defaultPath}/:contaId/import`, upload.single('file'), async (request: Request<{ contaId: string; }>, response: Response) => {
	try {

		if(!request.file) {
			return route({ response, responseData: notFound('Arquivo não encontrado') });
		}

		const acceptedExtensions = ['xlsx', 'xls'];
		const extension = request.file.originalname.split('.')[1];
		let responseData: ResponseData = { status: 422, body: 'Formato de arquivo inválido'}

		if(acceptedExtensions.includes(extension)) {
			responseData = await importOperacoesByXlsController({
				operacaoRepository: repository,
				contaRepository,
				ativoRepository,
				regraEntradaRepository,
				contaId: request.params.contaId,
				file: path.resolve('.', 'temp', request.file.filename)
			})
		} else if (extension === 'csv') {
			responseData = await importOperacoesByCsvController({
				operacaoRepository: repository,
				contaRepository,
				ativoRepository,
				regraEntradaRepository,
				contaId: request.params.contaId,
				file: path.resolve('.', 'temp', request.file.filename)
			})

		}

		return route({ response, responseData });

	} catch (error: any) {
		return response.status(500).json({message: error.message})
	}
})

router.put(`${defaultPath}`, async (request: Request, response: Response) => {
	const responseData = await editController<Operacao, OperacaoDTO>({
		repository,
		input: {
			id: request.body.id,
			ativoId: request.body.ativoId,
			contaId: request.body.contaId,
			regraEntradaId: request.body.regraEntradaId,
			quantidade: request.body.quantidade,
			tipo: request.body.tipo,
			precoEntrada: request.body.precoEntrada,
			stopLoss: request.body.stopLoss,
			alvo: request.body.alvo,
			precoSaida: request.body.precoSaida,
			dataEntrada:request.body.dataEntrada,
			dataSaida: request.body.dataSaida,
			operacaoPerdida: request.body.operacaoPerdida,
			operacaoErrada: request.body.operacaoErrada,
			comentarios: request.body.comentarios
		},
		validate: validateOperacao,
		relations: [
			{
				id: request.body.ativoId,
				repository: ativoRepository,
				errorMessage: 'Ativo não encontrado.'
			},
			{
				id: request.body.contaId,
				repository: contaRepository,
				errorMessage: 'Conta não encontrada.'
			},
			{
				id: request.body.regraEntradaId,
				repository: regraEntradaRepository,
				errorMessage: 'Regra não encontrada.'
			},
		]
	});
	return route({ response, responseData });
})


router.delete(`${defaultPath}/:id`, async (request: Request<RequestParams>, response: Response) => {
	const responseData = await removeController<Operacao, OperacaoDTO>({ repository, id: request.params.id});
	return route({ response, responseData });
})


export { router as OperacaoRoutes };
