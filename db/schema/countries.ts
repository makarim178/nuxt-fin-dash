import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { creationFields } from "./commonFields";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const countries = sqliteTable('countries', {
    id: integer('id').primaryKey(),
    code: text('code'),
    country: text('country'),
    ...creationFields
})

export type Countries = InferSelectModel<typeof countries>
export type InsertCountries = InferInsertModel<typeof countries>