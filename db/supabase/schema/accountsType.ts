import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { creationFields } from "./commonFields";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const accountsType = pgTable('accountsType', {
    id: serial('id').notNull().primaryKey(),
    accountType: varchar('account_type', { length: 30 }),
    ...creationFields
})

export const accountsTypeSchema = createSelectSchema(accountsType)
export const insertAccoutsTypeSchema = createInsertSchema(accountsType)

export type AccountsTypeSchema = z.infer<typeof accountsTypeSchema>
export type InsertAccountsTypeSchema = z.infer<typeof insertAccoutsTypeSchema>

// export type AccountsType = InferSelectModel<typeof accountsType>
// export type InsertAccountsType = InferInsertModel<typeof accountsType>