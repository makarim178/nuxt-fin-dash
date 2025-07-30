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
])

export const accountsTypeNameEnum = z.enum([
    'checking',
    'savings',
    'business_checking',
    'business_savings',
    'student',
    'joint',
    'retirement',
    'loan',
    'credit',
    'investment'
])

export const transactionTypeEnum = z.enum([
    'deposit',
    'withdrawal',
    'transfer',
    'payment',
    'refund',
    'fee',
    'purchase'
])

export const transactionStatusEnum = z.enum([
    'pending',
    'authorized',
    'posted',
    'settled',
    'failed',
    'reversed',
])

export const userRoleEnum = z.enum([
    'Super Admin',
    'Administrator',
    'Editor',
    'Author',
    'Contributor',
    'Subscriber'
])

export const accountStatusEnum = z.enum([
    'active',       // currently open and operational
    'inactive',     // temporarily disabled (no transactions)
    'frozen',       // blocked due to suspicious activity or legal issues
    'closed',       // permanently closed
    'pending',      // account opening process not yet completed
    'suspended',    // temporarily disabled by admin or fraud system
])

export type CardType = z.infer<typeof cardTypeEnum>
export type CardStatus = z.infer<typeof cardStatusEnum>;
export type CardNetwork = z.infer<typeof cardNetworkEnum>;
export type AccountTypeName = z.infer<typeof accountsTypeNameEnum>
export type TransactionType = z.infer<typeof transactionTypeEnum>
export type TransactionStatusType = z.infer<typeof transactionStatusEnum>
export type UserRoleType = z.infer<typeof userRoleEnum>
export type AccountStatus = z.infer<typeof accountStatusEnum>