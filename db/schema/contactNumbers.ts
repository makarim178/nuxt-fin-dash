import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm"
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core"
import { users } from "./users"
import { validityFields, creationFields } from "./commonFields"

export const contactNumbers = sqliteTable('contactNumbers', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    countryCode: text(''),
    type: text(''),
    number: text('number'),
    ...validityFields,
    ...creationFields
})

export const UserContactsRelation = relations(contactNumbers, ({one}) => ({
    phoneNumbers: one(users, {
        fields: [contactNumbers.userId],
        references: [users.id]
    })
}))

export type ContactNumber = InferSelectModel<typeof contactNumbers>
export type InsertContactNumber = InferInsertModel<typeof contactNumbers>