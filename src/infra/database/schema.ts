import { relations } from "drizzle-orm";
import { boolean, date, datetime, int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const usuarioTable = mysqlTable('usuario', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).unique().notNull(),
	password: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).unique().notNull()
})

export const usuarioContas = relations(usuarioTable, ({ many }) => ({
	contas: many(contaTable)
}))

export const contaTable = mysqlTable('conta', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	usuarioId: varchar({ length: 255 }).notNull(),
	nome: varchar({ length: 255 }).notNull(),
	tipo: varchar({ length: 255 }).notNull(),
	saldo: int().notNull().default(0),
	saldoInicial: int().notNull().default(0),
})

export const ativoTable = mysqlTable('ativo', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	acronimo: varchar({ length: 255 }).notNull().unique(),
	tipo: varchar({ length: 255 }).notNull(),
	multiplicador: int().notNull().default(1),
	divider: int().notNull().default(0), //casas após a virgula
	dataVencimento: date(),
});

export const tradingPlanTable = mysqlTable('trading_plan', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	link: text(),
})

export const tradingPlanToRegrasEntrada = relations(tradingPlanTable, ({ one }) => ({
	regrasEntradaTradingPlan: one(regrasEntradaTradingPlanTable, {
		fields: [tradingPlanTable.id],
		references: [regrasEntradaTradingPlanTable.tradingPlanId]
	})
}))

export const regrasEntradaTradingPlanTable = mysqlTable('regras_entrada_trading_plan', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	tradingPlanId: varchar({ length: 255 }).notNull(),
	nome: text().notNull(),
})

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
	comentários: text()
});


/** Relacionamentos */

/** Usuario 1 - n Contas */
export const usuarioToContas = relations(usuarioTable, ({ many }) => ({
	contas: many(contaTable)
}))

export const contasToUsuario = relations(contaTable, ({ one }) => ({
	usuario: one(usuarioTable, {
		fields: [contaTable.usuarioId],
		references: [usuarioTable.id]
	})
}));

/** Ativo 1 - n Operacoes */
export const ativoToOperacoes = relations(ativoTable, ({ many }) => ({
	operacoes: many()
}))

export const ativoToOperacoes = relations(ativoTable, ({ one }) => ({
	operacao: one(operacaoTable, {
		fields:[ativoTable.id],
		references: [operacaoTable.ativoId]
	})
}))

export const operacoesToAtivo = relations(usuarioTable, ({ many }) => ({
	contas: many(contaTable)
}))



export const contaToOperacoes = relations(contaTable, ({ one }) => ({
	operacao: one(operacaoTable, {
		fields:[contaTable.id],
		references: [operacaoTable.ativoId]
	})
}))

