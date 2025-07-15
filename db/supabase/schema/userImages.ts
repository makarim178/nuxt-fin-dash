import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cascadeOptions, creationFields } from "./commonFields";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userImages = pgTable('userImages', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id, cascadeOptions),
    imageUrl: varchar('image_url', { length: 255 }),
    ...creationFields
})

export const imageRelations = relations(userImages, ({ one }) => ({
    user: one(user, {
        fields: [userImages.userId],
        references: [user.id]
    })
}))

// export type UserImages = InferSelectModel<typeof userImages>
// export type InsertUserImages = InferInsertModel<typeof userImages>

export const userImageSchema = createSelectSchema(userImages)
export const insertUserImageSchema = createInsertSchema(userImages, {
    userId: (schema) => schema.min(1)
}) 

export type UserImageSchema = z.infer<typeof userImageSchema>
export type InsertUserImageSchema = z.infer<typeof insertUserImageSchema>
