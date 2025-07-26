import { z } from 'zod/v4';

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

export type transactionType = z.infer<typeof transactionTypeEnum>
export type transactionStatusType = z.infer<typeof transactionStatusEnum>