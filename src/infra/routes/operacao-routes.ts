import { Router, Request, Response} from 'express'
import multer from 'multer';
import { ativosPrismaRepository, contaPrismaRepository, operacaoPrismaRepository } from '@/infra/database/prisma';
import { route } from '@/infra/adapters/route';
import { createOperacaoController, editOperacaoController, getOperacaoController, importOperacoesByCsvController, listOperacaoByContaController, listOperacaoController, removeOperacaoController } from '@/application/controllers/operacao';
import { notFound } from '@/infra/adapters/response-wrapper';

const router = Router();
const repository = operacaoPrismaRepository;
const contaRepository = contaPrismaRepository;
const ativoRepository = ativosPrismaRepository;
const path = '/operacoes'

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

router.get(`${path}`, async (request: Request, response: Response) => {
	const responseData = await listOperacaoController(repository);
	return route({ response, responseData });
})

router.get(`${path}/conta/:id/range/:init/:end`, async (request: Request, response: Response) => {
	const responseData = await listOperacaoByContaController({repository, contaId: request.params.id, range: {init: request.params.init, end: request.params.end}});
	return route({ response, responseData });
})

router.get(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await getOperacaoController({repository, id: request.params.id});
	return route({ response, responseData });
})

router.post(`${path}`, async (request: Request, response: Response) => {
	const responseData = await createOperacaoController({
		operacaoRepository: repository,
		contaRepository,
		ativoRepository,
		input: {
			ativoId: request.body.ativoId,
			contaId: request.body.contaId,
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
	}});
	return route({ response, responseData });
})

router.post(`${path}/import`, upload.single('csvFile'), async (request: Request, response: Response) => {
	if(!request.file) {
		return route({ response, responseData: notFound('Arquivo não encontrado') });
	}

	const responseData = await importOperacoesByCsvController({
		operacaoRepository: repository,
		ativoRepository,
		contaRepository,
		csvFile: request.file.filename
	})

	return route({ response, responseData });
})

router.put(`${path}`, async (request: Request, response: Response) => {
	const responseData = await editOperacaoController({
		operacaoRepository: repository,
		contaRepository,
		ativoRepository,
		input: {
			id: request.body.id,
			ativoId: request.body.ativoId,
			contaId: request.body.contaId,
			quantidade: request.body.quantidade,
			tipo: request.body.tipo,
			precoEntrada: request.body.precoEntrada,
			stopLoss: request.body.stopLoss,
			alvo: request.body.alvo,
			precoSaida: request.body.precoSaida,
			dataEntrada:request.body.dataEntrada,
			dataSaida: request.body.dataSaida,
			margem: request.body.margem,
			operacaoPerdida: request.body.operacaoPerdida,
			operacaoErrada: request.body.operacaoErrada
	}});
	return route({ response, responseData });
})


router.delete(`${path}/:id`, async (request: Request, response: Response) => {
	const responseData = await removeOperacaoController({repository, id: request.params.id});
	return route({ response, responseData });
})


export { router as OperacaoRoutes };
