import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { accounts } from "./account";
import type { CardType } from "../types/cardTypes";
import type { CardStatusType } from "../types/cardStatusType";
import { relations } from "drizzle-orm";

export const cards = pgTable('cards', {
    cardId: uuid('card_id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => users.id),
    accountId: uuid('account_id').notNull().references(() => accounts.accountId),
    cardNumber: varchar('card_number', { length: 16 }).notNull().unique(),
    cardType: varchar('card_type', { length: 20}).notNull().$type<CardType>(),
    expiryDate: timestamp('expiry_date').notNull(),
    cvv: varchar('cvv', { length : 4 }).notNull(),
    status: varchar('status', {length: 20}).notNull().$type<CardStatusType>().default('active'),
    issuedAt: timestamp('issued_at', { withTimezone: true}).defaultNow()
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