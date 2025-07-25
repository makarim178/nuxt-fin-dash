import { decimal, index, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"
import { accounts } from "./account"
import { creationFields } from "./commonFields"
import { relations } from "drizzle-orm"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import type { transactionTypeEnum } from "../types/transactionType"
import { z } from "zod/v4"

export const transactions = pgTable('transactions', {
    transactionId: uuid('transaction_id').primaryKey().defaultRandom(),
    accountId: uuid('account_id').notNull().references(() => accounts.accountId),
    amount: decimal('amount', { precision: 15, scale: 2}).notNull(),
    transactionType: varchar('transaction_type', { length: 20 }).notNull().$type<typeof transactionTypeEnum>(),
    referenceId: uuid('referece_id'),
    description: text('description'),
    runningBalance: decimal('running_balance', { precision: 15, scale: 2}),
    ...creationFields
}, (table) => ([
    index('idx_transactions_account_created').on(table.accountId, table.createdAt )
]))

export const transactionRelations = relations(transactions, ({ one })=> ({
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.accountId]
    })
}))

export const transactionsSchema = createSelectSchema(transactions)
export const insertTransactionSchema = createInsertSchema(transactions)

export type TransactionsSchema = z.infer<typeof transactionsSchema>
export type InsertTransactionsSchema = z.infer<typeof insertTransactionSchema>