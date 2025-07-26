import { z } from 'zod/v4';

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

export const cardStatusEnum = z.enum([
    'pending',
    'inactive',
    'active',
    'blocked',
    'suspended',
    'expired',
    'lost',
    'stolen',
    'replaced',
    'cancelled'
])

export const cardNetworkEnum = z.enum([
  'visa',
  'mastercard',
  'amex',
  'discover',
  'rupay',
  'unionpay',
  'jcb',
]);

export type CardType = z.infer<typeof cardTypeEnum>
export type CardStatus = z.infer<typeof cardStatusEnum>;
export type CardNetwork = z.infer<typeof cardNetworkEnum>;