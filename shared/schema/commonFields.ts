import { boolean, timestamp } from 'drizzle-orm/pg-core';
import type { UpdateDeleteAction } from 'drizzle-orm/pg-core';

export const creationFields = {
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
}

export const validityFields = {
    isValid: boolean('is_valid'),
    isPrimary: boolean('is_primary')
}

export const cascadeOptions = {
    onDelete: 'cascade' as UpdateDeleteAction,
    // onUpdate: 'cascade' as UpdateDeleteActionType
}