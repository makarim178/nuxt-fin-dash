import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { creationFields } from "./commonFields";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from "zod/v4";

export const userRoleTypes = pgTable('userRoleTypes', {
    id: serial('id').notNull().primaryKey(),
    type: varchar('type', { length: 100 }).notNull().unique(),
    ...creationFields
})

export const roleTypesRelations = relations(userRoleTypes, ({ one }) => ({
    user: one(user, {
        fields: [userRoleTypes.id],
        references: [user.roleTypeId]
    })
}))

export const userRoleSchema = createSelectSchema(userRoleTypes)
export type UserRoleSchema = z.infer<typeof userRoleSchema>

export const insertUserRoleSchema = createInsertSchema(userRoleTypes)
export type InsertUserRoleSchema = z.infer<typeof insertUserRoleSchema>