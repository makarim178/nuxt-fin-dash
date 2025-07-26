import { z } from 'zod/v4';

export const accountsOverviewReturnSchema = z.object({
    month: z.number().min(1).max(12).optional(),
    year: z.number().optional(),
    title: z.string(),
    totalBalance: z.number(),
    change: z.number()
})

export const listAccountsOverviewReturnSchema = z.array(accountsOverviewReturnSchema)

export type AccountsOverviewReturnSchema = z.infer<typeof accountsOverviewReturnSchema>
export type ListAccountsOverviewReturnSchema = z.infer<typeof listAccountsOverviewReturnSchema>