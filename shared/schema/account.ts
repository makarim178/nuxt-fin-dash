import { decimal, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { cascadeOptions } from './commonFields';
import { accountsType } from './accountsType';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { transactions } from './transactions';
import { cards } from './cards';
import type { accountStatusEnum } from '../types/enums';
import type { z } from 'zod/v4';

export const accounts = pgTable('accounts', {
    accountId: uuid('account_id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, cascadeOptions),
    accountsType: uuid('account_type_id').references(() => accountsType.typeId, cascadeOptions),
    balance: decimal('balance', { precision: 15, scale: 2}).default('0.00'),
    status: varchar('status', { length: 20 }).default('active').$type<typeof accountStatusEnum>(),
    openedAt: timestamp('opened_at', { withTimezone: true }).defaultNow(),
    closedAt: timestamp('closed_at', { withTimezone: true })
})

export const accountRelations = relations(accounts, ({ one, many }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id]
    }),
    accountType: one(accountsType, {
        fields: [accounts.accountsType],
        references: [accountsType.typeId]
    }),
    transactions: many(transactions),
    cards: many(cards)
}))

export const accountsSchema = createSelectSchema(accounts)
export const insertAccountsSchema = createInsertSchema(accounts)

export type AccountsSchema = z.infer<typeof accountsSchema>
export type InsertAccountsSchema = z.infer<typeof insertAccountsSchema>
