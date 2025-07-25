import { addAcountsOverviewReportRows } from '~~/server/supabase/queries/accountsQuery'
import { insertAccountsOverviewSchema } from '#shared/schema'
import type { InsertAccountsOverviewSchema }  from '#shared/schema'
import { db } from '@@/server/db-services'
import { z } from 'zod/v4'


const userSchema = z.object({
    userId: z.uuid()
})
const balanceSchema = z.object({
    issueType: z.literal(['Balance', 'Debt', 'Credit']),
    totalBalance: z.number()
})
const monthYearSchema = z.object({
    month: z.number(),
    year: z.number()
})

const analysisSchema = monthYearSchema.extend({
    balances: z.array(balanceSchema)
})

const monthlyAnalysisSchema = userSchema.extend({
    monthlyAnalysis: z.array(analysisSchema)
})

const prepDataSchema = z.array(insertAccountsOverviewSchema)

export default defineEventHandler(async (event) => {
    const { userId, monthlyAnalysis } = await readValidatedBody(event, monthlyAnalysisSchema.parse)

    const prepData = monthlyAnalysis.reduce((acc: InsertAccountsOverviewSchema[], { month, year, balances }) => {
        const balanceObj = balances.map(({ issueType, totalBalance}) => ({userId, month, year, issueType, totalBalance}))
        if ( balanceObj.length > 0) balanceObj.forEach(bal => acc.push(bal))
            return acc;
    }, [])
    
    const data = prepDataSchema.parse(prepData)
    return await db.transaction(async () => await addAcountsOverviewReportRows(data))    
})