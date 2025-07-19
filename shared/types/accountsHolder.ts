import { integer, pgTable, serial, uniqueIndex, uuid, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { accountsType, accountsTypeSchema } from "./accountsType";
import { cascadeOptions, creationFields } from "./commonFields";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const accountsHolder = pgTable('accountsHolder', {
    id: serial('id').notNull().primaryKey(),
    userId: uuid('user_id').notNull().references(() => user.id, cascadeOptions),
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

export const accountsHolderSchema = createSelectSchema(accountsHolder)
export const insertAccountsHolderSchema = createInsertSchema(accountsHolder)
export const accountsHolderWithRelationSchema = accountsHolderSchema.extend({
    accountType: accountsTypeSchema
})

export type AccountsHolderSchema = z.infer<typeof accountsHolderSchema>
export type InsertAccountsHolderSchema = z.infer<typeof insertAccountsHolderSchema>
export type AccountsHolderWithRelationSchema = z.infer<typeof accountsHolderWithRelationSchema>

// export type AccountsHolder = InferSelectModel<typeof accountsHolder>
// export type InsertAccountsHolder = InferInsertModel<typeof accountsHolder>