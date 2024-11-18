import { Router, Request, Response} from 'express'
import multer, { MulterError } from 'multer';
import { ativosPrismaRepository, contaPrismaRepository, operacaoPrismaRepository } from '@/infra/database/prisma';
import { route } from '@/infra/adapters/route';
import { createOperacaoController, editOperacaoController, getOperacaoController, importOperacoesByCsvController, listOperacaoByContaController, listOperacaoController, removeOperacaoController } from '@/application/controllers/operacao';
import { notFound } from '@/infra/adapters/response-wrapper';
import path from 'path';

const router = Router();
const repository = operacaoPrismaRepository;
const contaRepository = contaPrismaRepository;
const ativoRepository = ativosPrismaRepository;
const defaultPath = '/operacoes'

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
	const responseData = await listOperacaoController(repository);
	return route({ response, responseData });
})

router.get(`${defaultPath}/conta/:id/range/:init/:end`, async (request: Request, response: Response) => {
	const responseData = await listOperacaoByContaController({repository, contaId: request.params.id, range: {init: request.params.init, end: request.params.end}});
	return route({ response, responseData });
})

router.get(`${defaultPath}/:id`, async (request: Request, response: Response) => {
	const responseData = await getOperacaoController({repository, id: request.params.id});
	return route({ response, responseData });
})

router.post(`${defaultPath}`, async (request: Request, response: Response) => {
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

router.post(`${defaultPath}/import`, upload.single('csvFile'), async (request: Request, response: Response) => {
	try {
		console.log(request.file);

		if(!request.file) {
			return route({ response, responseData: notFound('Arquivo não encontrado') });
		}

		console.log(path.resolve('.', 'temp', request.file.filename));

		const responseData = await importOperacoesByCsvController({
			operacaoRepository: repository,
			ativoRepository,
			contaRepository,
			csvFile: path.resolve('.', 'temp', request.file.filename)
		})

		return route({ response, responseData });

	} catch (error: any) {
		return response.status(500).json({message: error.message})
	}
})

router.put(`${defaultPath}`, async (request: Request, response: Response) => {
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


router.delete(`${defaultPath}/:id`, async (request: Request, response: Response) => {
	const responseData = await removeOperacaoController({repository, id: request.params.id});
	return route({ response, responseData });
})


export { router as OperacaoRoutes };
