import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const accountType = sqliteTable('accountType', {
    id: integer('account_type_id').primaryKey(),
    type: text('account_type')
})

export type AccountType = InferSelectModel<typeof accountType>
export type InsertAccountType = InferInsertModel<typeof accountType>