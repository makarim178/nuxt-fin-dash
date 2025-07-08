import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm"
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core"
import { countries } from "./countries"
import { creationFields } from "./commonFields"

export const provinces = sqliteTable('provinces', {
    id: integer('id').primaryKey(),
    province: text('province'),
    countryId: integer('country_id').notNull().references(() => countries.id),
    ...creationFields
})

export const provinceRelation = relations(provinces, ({one}) => ({
    country: one(countries, {
        fields: [provinces.countryId],
        references: [countries.id]
    })
}))

export type Provinces = InferSelectModel<typeof provinces>
export type InsertProvinces = InferInsertModel<typeof provinces>