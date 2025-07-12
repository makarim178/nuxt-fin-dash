import { integer, pgTable, serial, real, date, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cascadeOptions, creationFields } from "./commonFields";
import { payeeAccountsHolders } from "./payeeAccountsHolders";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

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

export type TransactionHistory = InferSelectModel<typeof transactionHistory>
export type InsertTransactionHistory = InferInsertModel<typeof transactionHistory>