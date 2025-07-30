import { pgTable, decimal, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';
import { accounts } from './account';
import { relations } from 'drizzle-orm';
import type { CardNetwork } from '../types/enums';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod/v4';

export const cards = pgTable('cards', {
  cardId: uuid('card_id').primaryKey().defaultRandom(),
  cardNumber: varchar('card_number', { length: 20 }).notNull().unique(),
  cardType: varchar('card_type', { length: 20 }).notNull().$type<typeof cardTypeEnum>(),
  cardStatus: varchar('card_status', { length: 20 }).notNull().$type<typeof cardStatusEnum>(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accountId: uuid('account_id').notNull().references(() => accounts.accountId, { onDelete: 'cascade' }),
  limitAmount: decimal('limit_amount', { precision: 12, scale: 2 }),
  dailyLimit: decimal('daily_limit', { precision: 12, scale: 2 }),
  billingCycleDay: varchar('billing_cycle_day', { length: 2 }),
  cardNetwork: varchar('card_network', { length: 20 }).notNull().$type<CardNetwork>(),
  expirationDate: timestamp('expiration_date', { withTimezone: true }),
  activatedAt: timestamp('activated_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export const cardRelations = relations(cards, ({ one }) => ({
    user: one(users, {
        fields: [cards.userId],
        references: [users.id]
    }),
    account: one(accounts, {
        fields: [cards.accountId],
        references: [accounts.accountId]
    })
}))

export const cardsSchema = createSelectSchema(cards)
export const insertCardSchema = createInsertSchema(cards)

export type CardsSchema = z.infer<typeof cardsSchema>
export type InsertCardSchema = z.infer<typeof insertCardSchema>