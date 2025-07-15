import { integer, pgTable, serial, index, varchar } from "drizzle-orm/pg-core";
import { cascadeOptions, creationFields } from "./commonFields";
import { userRoleSchema, userRoleTypes } from "./userRoleTypes";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { userImages, userImageSchema } from "./userImages";
import { locations, locationSchema } from "./locations";
import { userContacts, userContactSchema } from "./userContacts";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const user = pgTable('user', {
    id: serial('id').notNull().primaryKey(),
    title: varchar('title', { length: 5 }),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    dob: varchar('dob', {length: 10 }),
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

export const userWithRelations = userSchema.extend({
    role: userRoleSchema,
    images: z.array(userImageSchema),
    contacts: z.array(userContactSchema),
    locations: z.array(locationSchema)
}) 

export const insertUserSchema = createInsertSchema(user, {
    roleTypeId: (schema) => schema.min(1)
})

export type UserSchema = z.infer<typeof userSchema>
export type InsertUserSchema = z.infer<typeof insertUserSchema>
export type UserWithRelationSchema = z.infer<typeof userWithRelations>

// export type User = InferSelectModel<typeof user>
// export type InsertUser = InferInsertModel<typeof user>

