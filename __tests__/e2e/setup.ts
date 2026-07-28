	import { afterAll, aroundAll, beforeAll } from "vitest";
import { usuarioRepository } from "@/infra/database/repositories/usuario-repository";
import { reset } from "drizzle-seed";
import { database } from "@/infra/database";
import * as schema from '../../src/infra/database/schema'
import { TEST_TYPE } from "@/infra/config/environment";
import { ativo1, ativo2, conta1, conta2, regraEntrada1, regraEntrada2, tradingPlan, user } from "../artifacts";
import { ativoRepository, contaRepository, regraEntradaRepository, tradingPlanRepository } from "@/infra/database/repositories";

export const clearDatabase = async () => {
	await reset(database, schema);
	console.log('banco limpo');
}

beforeAll(async () => {
	if(TEST_TYPE === 'e2e') {
		const result = await usuarioRepository.get(user.id);
		if(!result) {
			await usuarioRepository.create(user);
		}

		const tpResult = await tradingPlanRepository.get(tradingPlan.id);

		if(!tpResult) {
			tradingPlanRepository.create(tradingPlan);
		}

		const regraResult = await regraEntradaRepository.get(regraEntrada1.id);
		if(!regraResult) {
			regraEntradaRepository.create(regraEntrada1);
		}

		const regraResult2 = await regraEntradaRepository.get(regraEntrada2.id);
		if(!regraResult2) {
			regraEntradaRepository.create(regraEntrada2);
		}
}
})

// afterAll(async () => {
// 	await clearDatabase();
// });

