import { integer, pgTable, index, varchar, uuid } from "drizzle-orm/pg-core";
import { cascadeOptions, creationFields } from "./commonFields";
import { userRoleTypes } from "./userRoleTypes";
import { relations } from "drizzle-orm";
import { userImages } from "./userImages";
import { locations } from "./locations";
import { userContacts } from "./userContacts";

import { z } from "zod/v4";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const user = pgTable('user', {
    id: uuid().notNull().unique().primaryKey(),
    title: varchar('title', { length: 5 }),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    roleTypeId: integer('roleTypeId').notNull().references(() => userRoleTypes.id, cascadeOptions),
    ...creationFields
}, (table) => [
    index('first_name').on(table.firstName),
    index('last_name').on(table.lastName),
])

export const userRelations = relations(user, ({one, many}) => ({
    role: one(userRoleTypes, {
        fields: [user.roleTypeId],
        references: [userRoleTypes.id]
    }),
    images: many(userImages),
    contacts: many(userContacts),
    locations: many(locations)
}))

export const userSchema = createSelectSchema(user, {
    roleTypeId: (schema) => schema.min(1),
})

export const insertUserSchema = createInsertSchema(user, {
    roleTypeId: (schema) => schema.min(1)
})


export type UserSchema = z.infer<typeof userSchema>
export type InsertUserSchema = z.infer<typeof insertUserSchema>
// export type User = InferSelectModel<typeof user>
// export type InsertUser = InferInsertModel<typeof user>

