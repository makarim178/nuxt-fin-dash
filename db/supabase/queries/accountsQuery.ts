import { db } from "~/server/db-services";
import { eq, desc } from 'drizzle-orm'
import { accountsOverviewReport, type InsertAccountsOverviewReport } from "../schema";

export const addAcountsOverviewReportRows = async (data: InsertAccountsOverviewReport[]) => 
    await db.transaction(async (tx) => 
        await tx.insert(accountsOverviewReport).values(data).returning({id: accountsOverviewReport.id}))

export const getAccountsOverviewReport = (async (userId: number) => await db.select({
        month: accountsOverviewReport.month,
        year: accountsOverviewReport.year,
        issueType: accountsOverviewReport.issueType,
        totalBalance: accountsOverviewReport.totalBalance
    }).from(accountsOverviewReport)
    .where(eq(accountsOverviewReport.userId, 1))
    .groupBy(accountsOverviewReport.month, accountsOverviewReport.year, accountsOverviewReport.issueType, accountsOverviewReport.totalBalance)
    .orderBy(desc(accountsOverviewReport.month)))