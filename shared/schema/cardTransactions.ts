import { pgTable, uuid, decimal, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { cards } from './cards';
import { accounts } from './accounts';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';

export const cardTransactions = pgTable('card_transactions', {
  transactionId: uuid('transaction_id').primaryKey().defaultRandom(),
  cardId: uuid('card_id')
    .notNull()
    .references(() => cards.cardId, { onDelete: 'cascade' }),
  accountId: uuid('account_id')
    .notNull()
    .references(() => accounts.accountId, { onDelete: 'cascade' }),

  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull(),
  merchant: varchar('merchant', { length: 100 }).notNull(),
  location: varchar('location', { length: 100 }),
  category: varchar('category', { length: 50 }),
  transactionType: varchar('transaction_type', { length: 20 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  referenceId: varchar('reference_id', { length: 50 }).notNull().unique(),
  rawPayload: jsonb('raw_payload'),
  authorizedAt: timestamp('authorized_at', { withTimezone: true }),
  executedAt: timestamp('executed_at', { withTimezone: true }).notNull(),
  settledAt: timestamp('settled_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const cardTransactionRelations = relations(cardTransactions, ({ one }) => ({
    card: one(cards, {
        fields: [cardTransactions.cardId],
        references: [cards.cardId]
    }),
    account: one(accounts, {
        fields: [cardTransactions.accountId],
        references: [accounts.accountId]
    })
}))

export const cardTransactionSchema = createSelectSchema(cardTransactions)
export const insertCardTransactionSchema = createInsertSchema(cardTransactions)

export type CardTransactionSchema = z.infer<typeof cardTransactionSchema>
export type InsertCardTransactionSchema = z.infer<typeof insertCardTransactionSchema>