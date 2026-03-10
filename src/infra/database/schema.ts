import { relations } from "drizzle-orm";
import { boolean, date, datetime, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const usuarioTable = mysqlTable('usuario', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).unique().notNull(),
	password: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).unique().notNull()
})

/** Usuario 1 - n Contas */
export const usuarioToContas = relations(usuarioTable, ({ many }) => ({
	contas: many(contaTable)
}))

/** Usuario 1 - n Trading Plans */
export const usuarioToTradingPlans = relations(usuarioTable, ({ many }) => ({
	tradingPlans: many(tradingPlanTable)
}))

export const contaTable = mysqlTable('conta', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	usuarioId: varchar({ length: 255 }).notNull(),
	nome: varchar({ length: 255 }).notNull(),
	tipo: varchar({ length: 255 }).notNull(),
	saldo: int().notNull().default(0),
	saldoInicial: int().notNull().default(0),
});

/** Contas n - 1 Usuario */
export const contasToUsuario = relations(contaTable, ({ one }) => ({
	usuario: one(usuarioTable, {
		fields: [contaTable.usuarioId],
		references: [usuarioTable.id]
	})
}));

/** Conta 1 - n Operações */
export const contaToOperacoes = relations(contaTable, ({ many }) => ({
	operacoes: many(operacaoTable)
}))


export const ativoTable = mysqlTable('ativo', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	acronimo: varchar({ length: 255 }).notNull().unique(),
	tipo: varchar({ length: 255 }).notNull(),
	multiplicador: int().notNull().default(1),
	divider: int().notNull().default(0), //casas após a virgula
	dataVencimento: date(),
});

/** Ativo 1 - n Operações */
export const ativoToOperacoes = relations(ativoTable, ({ many }) => ({
	operacoes: many(operacaoTable)
}))

export const tradingPlanTable = mysqlTable('trading_plan', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	usuarioId: varchar({ length: 255 }).notNull(),
	nome: varchar({ length: 255 }).notNull(),
	link: text(),
})

/** trading plan 1 - n regra */
export const tradingPlanToRegras = relations(tradingPlanTable, ({ many }) => ({
	regraEntrada: many(regraEntradaTable)
}))


/** tradingPlan n - 1 Usuario */
export const tradingPlanToUsuario = relations(tradingPlanTable, ({ one }) => ({
	usuario: one(usuarioTable, {
		fields: [tradingPlanTable.usuarioId],
		references: [usuarioTable.id]
	})
}));

export const regraEntradaTable = mysqlTable('regra_entrada', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	tradingPlanId: varchar({ length: 255 }).notNull(),
	nome: text().notNull(),
})

/** regra 1 - n operacoes */
export const regraEntradaToOperacoes = relations(regraEntradaTable, ({ many }) => ({
	operacoes: many(operacaoTable)
}))

/** regra n - n trading plan */
export const regraEntradaToTradingPlan = relations(tradingPlanTable, ({ one }) => ({
	regraEntradaTradingPlan: one(regraEntradaTable, {
		fields: [tradingPlanTable.id],
		references: [regraEntradaTable.tradingPlanId]
	})
}))

export const operacaoTable = mysqlTable('operacao', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	ativoId: varchar({ length: 255 }).notNull(),
	contaId: varchar({ length: 255 }).notNull(),
	regraEntradaId: varchar({ length: 255 }).notNull(),
	quantidade: int().notNull().default(1),
	tipo: varchar({ length: 100 }).notNull(),
	precoEntrada: int().notNull(),
	stopLoss: int(),
	alvo: int(),
	precoSaida: int(),
	dataEntrada: datetime({mode: 'date'}).notNull(),
	dataSaida: datetime({mode: 'date'}),
	operacaoPerdida: boolean().notNull().default(false),
	operacaoErrada: boolean().notNull().default(false),
	comentarios: text()
});

/** operacoes n - 1 contas */
export const operacoesToContas = relations(operacaoTable, ({ one }) => ({
	conta: one(contaTable, {
		fields: [operacaoTable.contaId],
		references: [contaTable.id]
	})
}))

/** operacoes n - 1 ativo */
export const operacoesToAtivo = relations(operacaoTable, ({ one }) => ({
	ativo: one(ativoTable, {
		fields: [operacaoTable.ativoId],
		references: [ativoTable.id]
	})
}))

/** operacoes n - 1 regra */
export const operacoesToRegrasEntrada = relations(operacaoTable, ({ one }) => ({
	regraEntradaTradingPlan: one(regraEntradaTable, {
		fields: [operacaoTable.regraEntradaId],
		references: [regraEntradaTable.id]
	})
}))
