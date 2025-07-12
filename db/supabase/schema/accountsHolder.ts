import { integer, pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { accountsType } from "./accountsType";
import { cascadeOptions, creationFields } from "./commonFields";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const accountsHolder = pgTable('accountsHolder', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id, cascadeOptions),
    accountsTypeId: integer('accounts_type_id').notNull().references(() => accountsType.id, cascadeOptions),
    accountNumber: varchar('account_number', { length: 600 }),
    cvv: varchar('cvv', { length: 5 }),
    expiryDate: varchar('expiry_date', { length: 5}),
    ...creationFields
},
(table) => [
    uniqueIndex('accounts_number_index').on(table.accountNumber)
])

export const accountHoldersRelations = relations(accountsHolder, ({one}) => ({
    accountsType: one(accountsType, {
        fields: [accountsHolder.accountsTypeId],
        references: [accountsType.id]
    })
}))

export type AccountsHolder = InferSelectModel<typeof accountsHolder>
export type InsertAccountsHolder = InferInsertModel<typeof accountsHolder>