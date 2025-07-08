import { relations, sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { creationFields, validityFields } from "./commonFields";
import { roleTypes } from "./roleType";
import { accounts } from "./accounts";
import { emails } from "./emails";
import { contactNumbers } from "./contactNumbers";
import { locations } from "./locations";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    title: text('title'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    dob: text('dob'),
    roleTypeId: integer('role_id').notNull().references(() => roleTypes.id),
    contactId: integer('contact_id'),
    ...creationFields
})

export const userRelations = relations(users, ({one, many}) => ({
    role: one(roleTypes, {
        fields: [users.roleTypeId],
        references: [roleTypes.id]
    }),
    accounts: many(accounts),
    locations: many(locations),
    emails: many(emails),
    phoneNumbers: many(contactNumbers)
}))

export type Users = InferSelectModel<typeof users>
export type InsertUsers = InferInsertModel<typeof users>