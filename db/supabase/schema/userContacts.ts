import { pgTable, serial, integer, varchar, uniqueIndex, index } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cascadeOptions, creationFields, validityFields } from "./commonFields";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const userContacts = pgTable('userContacts', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id, cascadeOptions),
    contactType: varchar('contact_type', { length: 10 }),
    contact: varchar('contact', { length: 255}).unique(),
    countryCode: varchar('country_code', { length : 5}),
    ...validityFields,
    ...creationFields
},
(table) => [
    index('contact_type_index').on(table.contactType),
    uniqueIndex('contact_index').on(table.contact)
])

export const contactRelations = relations(userContacts, ({ one }) => ({
    user: one(user, {
        fields: [userContacts.userId],
        references: [user.id]
    })
}))

export type UserEmails = InferSelectModel<typeof userContacts>
export type InsertUserEmails = InferInsertModel<typeof userContacts>