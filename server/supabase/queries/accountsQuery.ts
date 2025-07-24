import { db } from '@@/server/db-services';
import { eq, desc } from 'drizzle-orm'
import type { InsertAccountsOverviewSchema } from '#shared/types'
import { accountsOverviewReport } from '#shared/types';

export const addAcountsOverviewReportRows = async (data: InsertAccountsOverviewSchema[]) => 
    await db.transaction(async (tx) => 
        await tx.insert(accountsOverviewReport).values(data).returning({id: accountsOverviewReport.id}))

export const getAccountsOverviewReport = (async (userId: string) => await db.select({
        month: accountsOverviewReport.month,
        year: accountsOverviewReport.year,
        issueType: accountsOverviewReport.issueType,
        totalBalance: accountsOverviewReport.totalBalance
    }).from(accountsOverviewReport)
    .where(eq(accountsOverviewReport.userId, userId))
    .groupBy(accountsOverviewReport.month, accountsOverviewReport.year, accountsOverviewReport.issueType, accountsOverviewReport.totalBalance)
    .orderBy(desc(accountsOverviewReport.month), desc(accountsOverviewReport.issueType)))