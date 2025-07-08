import { sql } from "drizzle-orm"
import { integer, text } from "drizzle-orm/sqlite-core"

export const creationFields = {
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
}

export const validityFields = {
    isValid: integer('is_valid'),
    isPrimary: integer('is_primary')
}