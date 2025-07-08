import { integer, text, real, sqliteTable, check } from "drizzle-orm/sqlite-core";
import { sql, type InferInsertModel, type InferSelectModel } from 'drizzle-orm'


export const accountHistory = sqliteTable('accountHistory', {
    id: integer('id').primaryKey(),
    month: integer('month'),
    year: integer('year'),
    totalBalance: real('total_balance'),
    totalDebt: real('total_debt'),
    totalCredit: real('total_credit'),
    createdAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

export type AccountHistory = InferSelectModel<typeof accountHistory>
export type InsertAccountHistory = InferInsertModel<typeof accountHistory>

// 1	June	2025	24702.06	13123.03	38408.15	2025-07-04 07:11:41
// 2	July	2025	25801.06	13500.05	35069.25	2025-07-04 07:14:06