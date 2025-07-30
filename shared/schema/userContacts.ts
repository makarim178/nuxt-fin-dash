import { pgTable, serial, varchar, index, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { cascadeOptions, creationFields, validityFields } from './commonFields';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';

export const userContacts = pgTable('userContacts', {
    id: serial('id').notNull().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, cascadeOptions),
    contactType: varchar('contact_type', { length: 10 }),
    contact: varchar('contact', { length: 255}),
    countryCode: varchar('country_code', { length : 5}),
    ...validityFields,
    ...creationFields
},
(table) => [
    index('contact_index').on(table.contact),
])

export const contactRelations = relations(userContacts, ({ one }) => ({
    user: one(users, {
        fields: [userContacts.userId],
        references: [users.id]
    })
}))

export const userContactSchema = createSelectSchema(userContacts)
export const insertUserContactSchema = createInsertSchema(userContacts, {
    userId: (schema) => schema.min(1)
})

export type UserContactSchema = z.infer<typeof userContactSchema>
export type InsertUserContactSchema = z.infer<typeof insertUserContactSchema> 
