import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { creationFields } from "./commonFields";
import { users } from "./users";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { accountType } from "./accountType";

export const accounts = sqliteTable('accounts', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    accountTypeId: integer('account_type_id').notNull().references(() => accountType.id),
    accountNumber: text('account_number'),
    cvv: text('cvv'),
    expiry: text('expiry'),
    ...creationFields
})

export const UserAccountsRelation = relations(accounts, ({one}) => ({
    accounts: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    }),
    accountType: one(accountType, {
        fields: [accounts.accountTypeId],
        references: [accountType.id]
    })
}))

export type Accounts = InferSelectModel<typeof accounts>
export type InsertAccounts = InferInsertModel<typeof accounts>