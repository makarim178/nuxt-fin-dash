import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { creationFields } from "./commonFields";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { user } from "./user";

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

export type UserRoleTypes = InferSelectModel<typeof userRoleTypes>
export type InsertUserRoleTypes = InferInsertModel<typeof userRoleTypes>