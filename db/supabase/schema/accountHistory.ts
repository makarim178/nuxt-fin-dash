import { index, integer, pgTable, real, serial, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { cascadeOptions, creationFields } from "./commonFields";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const accountsOverviewReport = pgTable('accountOverviewReport', {
    id: serial('id').notNull().primaryKey(),
    userId: integer('user_id').notNull().references(() => user.id, cascadeOptions),
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

export type AccountsOverviewReport = InferSelectModel<typeof accountsOverviewReport>
export type InsertAccountsOverviewReport = InferInsertModel<typeof accountsOverviewReport>

// 1	June	2025	24702.06	13123.03	38408.15	2025-07-04 07:11:41
// 2	July	2025	25801.06	13500.05	35069.25	2025-07-04 07:14:06