import { integer, text, real, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const transactionHistory = sqliteTable('transactionHistory', {
    id: integer('id').primaryKey(),
    fromAccountId: integer('from_account_id'),
    toAccountId: integer('to_account_id'),
    totalAmount: real('amount'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export type TransactionHistory = InferSelectModel<typeof transactionHistory>
export type InsertTransactionHistory = InferInsertModel<typeof transactionHistory>


// 1	1	January	2025	103500
// 2	2	February	2025	93500
// 3	3	March	2025	106500
// 4	4	April	2025	93000
// 5	5	May	2025	68000
// 6	6	June	2025	85000
// 7	7	July	2025	35000