import { usuarioTable } from "@/infra/database/drizzle/tables/usuario-table";
import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const contaTable = mysqlTable('conta', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	usuarioId: varchar({ length: 255 }).notNull(),
	nome: varchar({ length: 255 }).notNull(),
	tipo: varchar({ length: 255 }).notNull(),
	saldo: int().notNull().default(0),
	saldoInicial: int().notNull().default(0),
})

export const contasUsuario = relations(contaTable, ({ one }) => ({
	usuario: one(usuarioTable, {
		fields: [contaTable.usuarioId],
		references: [usuarioTable.id]
	})
}))
