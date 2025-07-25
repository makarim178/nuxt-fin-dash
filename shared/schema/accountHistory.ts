import { index, integer, pgTable, real, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { cascadeOptions, creationFields } from './commonFields';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';
import { users } from './users';

export const accountsOverviewReport = pgTable('accountOverviewReport', {
    id: serial('id').notNull().primaryKey(),
    userId: uuid('user_id').notNull().references(() => users.id, cascadeOptions),
    month: integer('month'),
    year: integer('year'),
    issueType: varchar('issue_type', { length: 20 }),
    totalBalance: real('total_balance'),
    ...creationFields
},
(table) => [
    index('month_index').on(table.month),
    index('year_index').on(table.year),
    index('issue_type_index').on(table.issueType)
])

export const accountsOverviewSchema = createSelectSchema(accountsOverviewReport)
export const insertAccountsOverviewSchema = createInsertSchema(accountsOverviewReport)

export type AccountsOverviewSchema = z.infer<typeof accountsOverviewSchema>
export type InsertAccountsOverviewSchema = z.infer<typeof insertAccountsOverviewSchema>

// 1	June	2025	24702.06	13123.03	38408.15	2025-07-04 07:11:41
// 2	July	2025	25801.06	13500.05	35069.25	2025-07-04 07:14:06