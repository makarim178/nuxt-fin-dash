import { addAcountsOverviewReportRows } from "~/db/supabase/queries/accountsQuery"
import { InsertAccountsOverviewReport } from "~/db/supabase/schema"
import { db } from "~/server/db-services"

type InsertAccountsOverViewReportType = {
    userId: number
    monthlyAnalysis: InsertAccountsMonthlyAnalysisType[]
}
type InsertAccountsMonthlyAnalysisType = {
    month: number
    year: number
    balances: InsertAccountsBalanceType[]
}

type InsertAccountsBalanceType = {
    issueType: string
    totalBalance: number
}

export default defineEventHandler(async (event) => {
    const { userId, monthlyAnalysis }: InsertAccountsOverViewReportType = await readBody(event) 
    const prepData = monthlyAnalysis.reduce((acc: InsertAccountsOverviewReport[], { month, year, balances }: InsertAccountsMonthlyAnalysisType): InsertAccountsOverviewReport[] => {

        const balanceObj: InsertAccountsOverviewReport[] = balances.map(({ issueType, totalBalance}: InsertAccountsBalanceType) => ({userId: userId, month, year, issueType, totalBalance}))
        if (balanceObj.length > 0) balanceObj.forEach(bal => acc.push(bal))
        return acc;
    }, [])

    const results = await db.transaction(async (t) => await addAcountsOverviewReportRows(prepData))

    return results
})