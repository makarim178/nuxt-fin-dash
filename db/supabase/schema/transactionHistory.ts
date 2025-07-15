import { integer, pgTable, serial, real, date, timestamp } from "drizzle-orm/pg-core";
import { user, userSchema } from "./user";
import { cascadeOptions, creationFields } from "./commonFields";
import { payeeAccountsHolders, payeeAccountsHolderSchema } from "./payeeAccountsHolders";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const transactionHistory = pgTable('transactionHistory', {
    id: serial('id').notNull().primaryKey(),
    userAccountId: integer('user_account_id').references(() => user.id, cascadeOptions),
    payeeAccountId: integer('payee_account_id').references(() => payeeAccountsHolders.id, cascadeOptions),
    amount: real('amount'),
    payDate: timestamp('payDate').notNull().defaultNow(),
    ...creationFields
})

export const transactionsRelations = relations(transactionHistory, ({one}) => ({
    user: one(user, {
        fields: [transactionHistory.userAccountId],
        references: [user.id]
    }),
    payee: one(payeeAccountsHolders, {
        fields: [transactionHistory.payeeAccountId],
        references: [payeeAccountsHolders.id]
    })
}))

export const transactionHistorySchema = createSelectSchema(transactionHistory)
export const insertTransactionHistorySchema = createInsertSchema(transactionHistory)
export const transactionHisWithRelationSchema = transactionHistorySchema.extend({
    user: userSchema,
    payee: payeeAccountsHolderSchema
})

// export type 

// export type TransactionHistory = InferSelectModel<typeof transactionHistory>
// export type InsertTransactionHistory = InferInsertModel<typeof transactionHistory>

// 1	1	January	2025	103500
// 2	2	February	2025	93500
// 3	3	March	2025	106500
// 4	4	April	2025	93000
// 5	5	May	2025	68000
// 6	6	June	2025	85000
// 7	7	July	2025	35000