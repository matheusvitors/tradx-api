import { contaTable } from "@/infra/database/drizzle/tables/conta-table";
import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usuarioTable = mysqlTable('usuario', {
	id: varchar({ length: 255 }).primaryKey().unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).unique().notNull(),
	password: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).unique()
})

export const usuarioContas = relations(usuarioTable, ({ many }) => ({
	contas: many(contaTable)
}))
