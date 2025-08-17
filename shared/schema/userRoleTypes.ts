import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { creationFields } from './commonFields';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { userRoleEnum } from '../types/enums';
import type { z } from 'zod/v4';

export const userRoleTypes = pgTable('user_role_types', {
    id: serial('id').notNull().primaryKey(),
    role: varchar('role', { length: 100 }).notNull().unique().$type<typeof userRoleEnum>(),
    ...creationFields
})

// export const roleTypesRelations = relations(userRoleTypes, ({ one }) => ({
//     user: one(users, {
//         fields: [userRoleTypes.id],
//         references: [users.roleTypeId]
//     })
// }))

export const userRoleSchema = createSelectSchema(userRoleTypes)
export type UserRoleSchema = z.infer<typeof userRoleSchema>

export const insertUserRoleSchema = createInsertSchema(userRoleTypes)
export type InsertUserRoleSchema = z.infer<typeof insertUserRoleSchema>