import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { creationFields } from "./commonFields";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const accountsType = pgTable('accountsType', {
    id: serial('id').notNull().primaryKey(),
    accountType: varchar('account_type', { length: 30 }),
    ...creationFields
})

export type AccountsType = InferSelectModel<typeof accountsType>
export type InsertAccountsType = InferInsertModel<typeof accountsType>