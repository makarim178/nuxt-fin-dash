import { integer, pgTable, serial, index, varchar } from "drizzle-orm/pg-core";
import { cascadeOptions, creationFields } from "./commonFields";
import { userRoleTypes } from "./userRoleTypes";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { userImages } from "./userImages";
import { locations } from "./locations";
import { userContacts } from "./userContacts";

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

export type User = InferSelectModel<typeof user>
export type InsertUser = InferInsertModel<typeof user>