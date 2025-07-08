import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { creationFields, validityFields } from "./commonFields";
import { users } from "./users";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export const userLogin = sqliteTable('userLogin', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    uuid: text('uuid'),
    password: text('password'),
    salt: text('salt'),
    md5: text('md5'),
    sha1: text('sha1'),
    sha256: text('sha256'),
    validUnitInMins: integer('valid_until_in_mins'),
    ...validityFields,
    ...creationFields
})

export const UserLoginRelation = relations(userLogin, ({one}) => ({
    userLogin: one(users, {
        fields: [userLogin.userId],
        references: [users.id]
    })
}))

export type UserLogin = InferSelectModel<typeof userLogin>
export type InsertUserLogin = InferInsertModel<typeof userLogin>