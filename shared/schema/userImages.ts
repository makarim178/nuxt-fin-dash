import { pgTable, serial, varchar, uuid, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { cascadeOptions, creationFields } from './commonFields';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';

export const userImages = pgTable('user_images', {
    id: serial('id').notNull().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, cascadeOptions),
    imageUrl: varchar('image_url', { length: 255 }),
    isPrimary: boolean('is_primary').default(false),
    ...creationFields
})

export const imageRelations = relations(userImages, ({ one }) => ({
    user: one(users, {
        fields: [userImages.userId],
        references: [users.id]
    })
}))

export const userImageSchema = createSelectSchema(userImages)
export const insertUserImageSchema = createInsertSchema(userImages, {
    userId: (schema) => schema.min(1)
}) 

export type UserImageSchema = z.infer<typeof userImageSchema>
export type InsertUserImageSchema = z.infer<typeof insertUserImageSchema>