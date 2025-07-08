import { relations, type InferInsertModel, type InferSelectModel } from "drizzle-orm"
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core"
import { creationFields } from "./commonFields"
import { provinces } from "./provinces"

export const cities = sqliteTable('cities', {
    id: integer('id').primaryKey(),
    city: text('city'),
    provinceId: integer('province_id').notNull().references(() => provinces.id),
    ...creationFields
})

export const citiesRelation = relations(cities, ({one}) => ({
    province: one(provinces, {
        fields: [cities.provinceId],
        references: [provinces.id]
    })
}))

export type Cities = InferSelectModel<typeof cities>
export type insertCities = InferInsertModel<typeof cities>