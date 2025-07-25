import { z } from "zod/v4";

export const transactionTypeEnum = z.enum(['deposit', 'withdraw', 'transfer'])
export type transactionType = z.infer<typeof transactionTypeEnum>