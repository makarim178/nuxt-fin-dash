import { pgTable, serial, integer, varchar, index } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cascadeOptions, creationFields, validityFields } from "./commonFields";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { z } from "zod/v4";

export const locations = pgTable('locations', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id, cascadeOptions),
    streetNumber: varchar('street_number', { length: 6 }).notNull(),
    streetName: varchar('street_name', { length: 500 }).notNull(),
    postcode: varchar('postcode', { length: 6}).notNull(),
    city: varchar('city', { length: 255}),
    province: varchar('province', { length: 255 }),
    country: varchar('country', { length : 255 }),
    ...validityFields,
    ...creationFields
}, 
(table) => [
    index('street_number_index').on(table.streetNumber),
    index('street_name_index').on(table.streetName),
    index('postcode_index').on(table.postcode),
    index('city_index').on(table.city),
    index('province_index').on(table.province),
    index('country_index').on(table.country)
])

export const locationRelations = relations(locations, ({ one }) => ({
    user: one(user, {
        fields: [locations.userId],
        references: [user.id]
    })
}))

export const locationSchema = createSelectSchema(locations)
export const insertLocationSchema = createInsertSchema(locations)

export type LocationSchema = z.infer<typeof locationSchema>
export type InsertLocationSchema = z.infer<typeof insertLocationSchema>