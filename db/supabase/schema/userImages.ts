import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cascadeOptions, creationFields } from "./commonFields";
import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";

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

export type UserImages = InferSelectModel<typeof userImages>
export type InsertUserImages = InferInsertModel<typeof userImages>