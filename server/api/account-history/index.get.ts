import { db } from "~/server/sqlite-service"
// import { accountHistory } from '../../../db/schema'
import { getCurrentWithPrev } from '../../../utils/date-details' 
import { or, and, eq, desc } from 'drizzle-orm'

type AccHistResponseType = {
    id: number
    month: string
    year: string
    totalBalance: number
    totalDebt: number
    totalCredit: number
    updatedAt: string
}
export default defineEventHandler( async (event) => {
    const getChange = (curr:number, prev:number): number => (curr - prev) / prev
    const mapAccountHistory = (currentMonthData: AccHistResponseType, previousMonthData: AccHistResponseType) => {
        return [
            {
                title: 'Total Balance',
                balance: currentMonthData.totalBalance.toString(),
                lastMonthBalance: previousMonthData.totalBalance.toString(),
                change: getChange(currentMonthData.totalBalance, previousMonthData.totalBalance).toFixed(2)
            },
            {
                title: 'Debt',
                balance: currentMonthData.totalDebt.toString(),
                lastMonthBalance: previousMonthData.totalDebt.toString(),
                change: getChange(currentMonthData.totalDebt, previousMonthData.totalDebt).toFixed(2)
            },
            {
                title: 'Credit',
                balance: currentMonthData.totalCredit.toString(),
                lastMonthBalance: previousMonthData.totalCredit.toString(),
                change: getChange(currentMonthData.totalCredit, previousMonthData.totalCredit).toFixed(2)
            }
        ]        
    }

    const retrieveAccountHistoryFromDB = async () => {
        try {
            return []
            // const { year, currentMonth, previousMonth } = getCurrentWithPrev()
            // const accHisRespose: AccHistResponseType[] = await db
            //     .select()
            //     .from(accountHistory)
            //     .where(and(
            //         eq(accountHistory.year, year.toString()),
            //         or(
            //             eq(accountHistory.month, currentMonth),
            //             eq(accountHistory.month, previousMonth)
            //         )
            //     ))
            //     .orderBy(desc(accountHistory.updatedAt))

            // return mapAccountHistory(accHisRespose[0], accHisRespose[1])
        } catch (error:any) {
            console.log(error)
            throw createError({
                statusCode: 400,
                statusMessage: error.message
            })
        }
    }
    return await retrieveAccountHistoryFromDB()
})