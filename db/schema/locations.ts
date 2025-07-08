import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { creationFields, validityFields } from "./commonFields";
import { users } from "./users";

export const locations = sqliteTable('locations', {
    id: integer('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    streetNumber: text('street_number'),
    streetName: text('street_name'),
    cityId: integer('city_id'),
    ...validityFields,
    ...creationFields
})

export const UserLocationsRelation = relations(locations, ({one}) => ({
    locations: one(users, {
        fields: [locations.userId],
        references: [users.id]
    })
}))

export type Locations = InferSelectModel<typeof locations>
export type InsertLocations = InferInsertModel<typeof locations>