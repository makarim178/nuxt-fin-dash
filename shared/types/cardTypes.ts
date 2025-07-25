import { z } from "zod/v4";

export const cardTypeEnum = z.enum([
    'debit',
    'credit',
    'prepaid',
    'virtual',
    'atm',
    'gift',
    'business',
    'charge'
])

export type CardType = z.infer<typeof cardTypeEnum>