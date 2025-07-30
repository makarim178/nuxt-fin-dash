import { pgTable, serial, varchar, index, uuid } from 'drizzle-orm/pg-core';
import { cascadeOptions, creationFields, validityFields } from './commonFields';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';
import { users } from './users';

export const locations = pgTable('locations', {
    id: serial('id').notNull().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, cascadeOptions),
    streetAddress: varchar('street_name', { length: 500 }).notNull(),
    postcode: varchar('postcode', { length: 10 }).notNull(),
    city: varchar('city', { length: 255}),
    province: varchar('province', { length: 255 }),
    country: varchar('country', { length : 255 }),
    ...validityFields,
    ...creationFields
}, 
(table) => [
    index('idx_street_address').on(table.streetAddress),
    index('idx_postcode').on(table.postcode),
    index('idx_city').on(table.city),
    index('idx_province').on(table.province),
    index('idx_country').on(table.country)
])

export const locationRelations = relations(locations, ({ one }) => ({
    user: one(users, {
        fields: [locations.userId],
        references: [users.id]
    })
}))

export const locationSchema = createSelectSchema(locations)
export const insertLocationSchema = createInsertSchema(locations)

export type LocationSchema = z.infer<typeof locationSchema>
export type InsertLocationSchema = z.infer<typeof insertLocationSchema>