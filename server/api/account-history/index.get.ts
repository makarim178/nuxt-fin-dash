import { db } from '~/server/db-services'
// import { getCurrentWithPrev } from '../../../utils/date-details' 
import { or, and, eq, desc } from 'drizzle-orm'
import { accountsOverviewReport } from '~/db/supabase/schema'
import { getAccountsOverviewReport } from '~/db/supabase/queries/accountsQuery'

type AccHistResponseType = {
    id: number
    month: string
    year: string
    totalBalance: number
    totalDebt: number
    totalCredit: number
    updatedAt: string
}

const calcDiff = (oldObj: AccountsOverviewResultType, newObj: AccountsOverviewResultType): number  => +((newObj.totalBalance - oldObj.totalBalance) / oldObj.totalBalance).toFixed(2)
type ReduceResultType = AccountsOverviewResultType[] | []
export default defineEventHandler( async (event) => {
    try {        
        const { userId }: { userId: number } = getQuery(event)
        if (typeof +userId !== 'number' || !userId) throw new Error('UserId as Number required!')    
        const analysis = await getAccountsOverviewReport(+userId)
        const result: ReduceResultType = analysis.reduce<AccountsOverviewQueryRow>((acc, row) => {
            const objExistsIndex: number = acc.findIndex((el: { year: number | null; title: string | null }) => el.year == row.year && el.title == row.issueType)
            let obj: AccountsOverviewResultType = {
                month: row.month ?? 0, 
                year: row.year ?? 0,
                title: row.issueType ?? '',
                totalBalance: row.totalBalance ?? 0,
                change: 0
            } 
            if (objExistsIndex >= 0) {
                const change = calcDiff(obj, acc[objExistsIndex])
                acc[objExistsIndex].change = +change
            } else acc.push(obj)
            return acc
        }, [])
        return result
    } catch (error: any) {
        throw new ReferenceError(error.message)        
    }
    // const getChange = (curr:number, prev:number): number => (curr - prev) / prev
    // const mapAccountHistory = (currentMonthData: AccHistResponseType, previousMonthData: AccHistResponseType) => {
    //     return [
    //         {
    //             title: 'Total Balance',
    //             balance: currentMonthData.totalBalance.toString(),
    //             lastMonthBalance: previousMonthData.totalBalance.toString(),
    //             change: getChange(currentMonthData.totalBalance, previousMonthData.totalBalance).toFixed(2)
    //         },
    //         {
    //             title: 'Debt',
    //             balance: currentMonthData.totalDebt.toString(),
    //             lastMonthBalance: previousMonthData.totalDebt.toString(),
    //             change: getChange(currentMonthData.totalDebt, previousMonthData.totalDebt).toFixed(2)
    //         },
    //         {
    //             title: 'Credit',
    //             balance: currentMonthData.totalCredit.toString(),
    //             lastMonthBalance: previousMonthData.totalCredit.toString(),
    //             change: getChange(currentMonthData.totalCredit, previousMonthData.totalCredit).toFixed(2)
    //         }
    //     ]        
    // }

    // const retrieveAccountHistoryFromDB = async () => {
    //     try {
    //         return []
    //         // const { year, currentMonth, previousMonth } = getCurrentWithPrev()
    //         // const accHisRespose: AccHistResponseType[] = await db
    //         //     .select()
    //         //     .from(accountHistory)
    //         //     .where(and(
    //         //         eq(accountHistory.year, year.toString()),
    //         //         or(
    //         //             eq(accountHistory.month, currentMonth),
    //         //             eq(accountHistory.month, previousMonth)
    //         //         )
    //         //     ))
    //         //     .orderBy(desc(accountHistory.updatedAt))

    //         // return mapAccountHistory(accHisRespose[0], accHisRespose[1])
    //     } catch (error:any) {
    //         console.log(error)
    //         throw createError({
    //             statusCode: 400,
    //             statusMessage: error.message
    //         })
    //     }
    // }
    // return await retrieveAccountHistoryFromDB()
})
