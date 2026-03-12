import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import { routes } from "@/routes";
import { NODE_ENV, PORT } from "@/infra/config/environment";
import { middlewares } from "@/infra/middlewares";

const app = express();

app.use(helmet());
app.use(middlewares);
app.use(routes);

if(process.env.NODE_ENV !== "test") {
	app.listen(PORT || 8000, function (){
		console.info('------------------------------------------------');
		console.info(`Tradx running on port ${PORT} in ${NODE_ENV}`);
		console.info('------------------------------------------------');
	});
}

export { app };

//TODO: Ajustar testes unitários
//TODO: Criar os controllers genericos
//TODO: Criar as rotas e implementacoes das novas tabelas
//TODO: Ajustar lógica das tabelas afetadas pelas atualizações
//TODO: Revisão dos validators
//TODO: Criar os testes e2e


