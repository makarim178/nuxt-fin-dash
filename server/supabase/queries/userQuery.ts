import { eq } from 'drizzle-orm';
import { db } from '@@/server/db-services';
import { user } from '#shared/types';
import type { InsertUserSchema } from '#shared/types';

export const getUser = async (userId: string) => {
    return await db.query.user.findFirst({
        where: eq(user.id, userId),
        with: {
            locations: true,
            contacts: true,
            role: true,
            images: true
        }
    })
}

export const addUser = async (values: InsertUserSchema): Promise<{userId: string}[]> => 
    await db.transaction(async (t) => await t.insert(user).values(values).returning({ userId: user.id}))