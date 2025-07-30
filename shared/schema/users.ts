import { integer, pgTable, index, varchar, uuid } from 'drizzle-orm/pg-core';
import { cascadeOptions, creationFields } from './commonFields';
import { userRoleTypes } from './userRoleTypes';
import { relations } from 'drizzle-orm';
import { userImages } from './userImages';
import { locations } from './locations';
import { userContacts } from './userContacts';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { cards } from './cards';
import { accounts } from './account';
import type { z } from 'zod/v4';

export const users = pgTable('users', {
    id: uuid().notNull().unique().primaryKey(),
    title: varchar('title', { length: 5 }),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    roleTypeId: integer('role_type_id').references(() => userRoleTypes.id, cascadeOptions),
    ...creationFields
}, (table) => [
    index('first_name').on(table.firstName),
    index('last_name').on(table.lastName),
])

export const userRelations = relations(users, ({one, many}) => ({
    role: one(userRoleTypes, {
        fields: [users.roleTypeId],
        references: [userRoleTypes.id]
    }),
    images: many(userImages),
    contacts: many(userContacts),
    locations: many(locations),
    cards: many(cards),
    accounts: many(accounts)
}))

export const userSchema = createSelectSchema(users, {
    roleTypeId: (schema) => schema.min(1),
})

export const insertUserSchema = createInsertSchema(users, {
    roleTypeId: (schema) => schema.min(1)
})


export type UserSchema = z.infer<typeof userSchema>
export type InsertUserSchema = z.infer<typeof insertUserSchema>
// export type User = InferSelectModel<typeof user>
// export type InsertUser = InferInsertModel<typeof user>

