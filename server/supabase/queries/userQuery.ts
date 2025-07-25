import { eq } from 'drizzle-orm';
import { db } from '@@/server/db-services';
import { user } from '#shared/schema';
import type { InsertUserSchema } from '#shared/schema';

export const getUser = async (userId: string) => {
    const data = await db.query.user.findFirst({
        where: eq(user.id, userId),
        with: {
            locations: true,
            contacts: true,
            role: true,
            images: true
        }
    })

    console.log(data)
    return data
}

export const addUser = async (values: InsertUserSchema): Promise<{userId: string}[]> => 
    await db.transaction(async (t) => await t.insert(user).values(values).returning({ userId: user.id}))