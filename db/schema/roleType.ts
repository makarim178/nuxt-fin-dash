import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { creationFields } from "./commonFields";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const roleTypes = sqliteTable('roleTypes', {
    id: integer('id').primaryKey(),
    type: text('type'),
    ...creationFields
})

export type RoleTypes = InferSelectModel<typeof roleTypes>
export type InsertRoleTypes = InferInsertModel<typeof roleTypes>