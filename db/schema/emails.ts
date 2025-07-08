import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { creationFields, validityFields } from "./commonFields";
import { users } from "./users";

export const emails = sqliteTable('emails', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    email: text('email'),
    ...validityFields,
    ...creationFields
})

export const UserEmailsRelation = relations(emails, ({one}) => ({
    emails: one(users, {
        fields: [emails.userId],
        references: [users.id]
    })
}))

export type Emails = InferSelectModel<typeof emails>
export type InsertEmails = InferInsertModel<typeof emails>