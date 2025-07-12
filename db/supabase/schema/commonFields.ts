import { boolean, timestamp } from "drizzle-orm/pg-core";

export const creationFields = {
    createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { mode: 'string'}).notNull().defaultNow()
}

export const validityFields = {
    isValid: boolean('is_valid'),
    isPrimary: boolean('is_primary')
}

export const cascadeOptions = {
    onDelete: 'cascade' as UpdateDeleteActionType,
    // onUpdate: 'cascade' as UpdateDeleteActionType
}