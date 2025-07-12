import { pgTable, serial, varchar, integer, index, uniqueIndex } from "drizzle-orm/pg-core";
import { cascadeOptions, creationFields, validityFields } from "./commonFields";
import { user } from "./user";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const payeeAccountsHolders = pgTable('payeeAccountsHolders', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id, cascadeOptions),
    methodType: varchar('method_type').notNull(),
    payeeName: varchar('payee_name', { length: 255 }),
    interactMethod: varchar('interact_method', { length: 10}),
    accountNumber: varchar('account_number', { length: 255 }),
    ...validityFields,
    ...creationFields
},
(table) => [
    index('payee_name_index').on(table.payeeName),
    uniqueIndex('account_number_index').on(table.accountNumber)
])

export type PayeeAccountsHolders = InferSelectModel<typeof payeeAccountsHolders>
export type InsertPayeeAccountsHolders = InferInsertModel<typeof payeeAccountsHolders>