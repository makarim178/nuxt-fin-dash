import { getAccountsOverviewReport } from '~~/server/supabase/queries/accountsQuery'
import { listAccountsOverviewReturnSchema } from '#shared/types/accounts'
import type { ListAccountsOverviewReturnSchema, AccountsOverviewReturnSchema } from '#shared/types/accounts'
import z from 'zod/v4'

const accHistResponseSchema = z.object({
    id: z.number().min(1).optional(),
    title: z.string().optional(),
    month: z.number().min(1).max(12),
    year: z.number(),
    totalBalance: z.number(),
    change: z.number().optional(),
    updatedAt: z.string().optional()
})

type AccHistResponseSchema = z.infer<typeof accHistResponseSchema>


const calcDiff = (oldObj: AccHistResponseSchema, newObj: AccountsOverviewReturnSchema): number  => +((newObj.totalBalance - oldObj.totalBalance) / oldObj.totalBalance).toFixed(2)

export default defineEventHandler( async (event) => {
    try {        
        const { userId }: { userId: number } = getQuery(event)
        if (typeof +userId !== 'number' || !userId) throw new Error('UserId as Number required!')    
        const analysis = await getAccountsOverviewReport(+userId)
        const result = analysis.reduce((acc: ListAccountsOverviewReturnSchema, row) => {
            const objExistsIndex: number = acc.findIndex((el) => el.year == row.year && el.title == row.issueType)
            const obj = {
                month: row.month ?? 0, 
                year: row.year ?? 0,
                title: row.issueType ?? '',
                totalBalance: row.totalBalance ?? 0,
                change: 0
            } 
            if (objExistsIndex >= 0) {
                const oldObj = accHistResponseSchema.parse(obj)
                const change = calcDiff(oldObj, acc[objExistsIndex])
                acc[objExistsIndex].change = +change
            } else acc.push(obj)
            return acc
        }, [])
        const parseResult = listAccountsOverviewReturnSchema.parse(result)
        return parseResult
    } catch (error) {
        if (error instanceof Error) {
            throw new ReferenceError(error.message)
        } else {
            console.error('Caught an unknown Error: ', error)
        }
    }
})
