import { pgTable, uuid, varchar, text, decimal } from 'drizzle-orm/pg-core';
import { creationFields } from './commonFields';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';
import { relations } from 'drizzle-orm';
import { accounts } from './account';
import type { accountsTypeNameEnum } from '../types/enums';

export const accountsType = pgTable('accountsType', {
    typeId: uuid('type_id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull().$type<typeof accountsTypeNameEnum>(),
    description: text('description'),
    minimumBalance: decimal('minimum_balance', { precision: 12, scale: 2 }).default('0'),
    interestRate: decimal('interest_rate', { precision: 5, scale: 2}).default('0.00'),
    monthlyFee: decimal('monthly_fee', { precision: 6, scale: 2}).default('0.00'),
    ...creationFields
})

export const accountTypeRelations = relations(accountsType, ({ many}) => ({
    accounts: many(accounts)
}))

export const accountsTypeSchema = createSelectSchema(accountsType)
export const insertAccountsTypeSchema = createInsertSchema(accountsType)

export type AccountsTypeSchema = z.infer<typeof accountsTypeSchema>
export type InsertAccountsTypeSchema = z.infer<typeof insertAccountsTypeSchema>

// export type AccountsType = InferSelectModel<typeof accountsType>
// export type InsertAccountsType = InferInsertModel<typeof accountsType>