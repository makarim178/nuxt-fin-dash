import { eq } from 'drizzle-orm';
import { db } from '@@/server/db-services';
import { users } from '#shared/schema';
import type { InsertUserSchema } from '#shared/schema';

export const getUser = async (userId: string) => {
    const data = await db.query.users.findFirst({
        where: eq(users.id, userId),
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
    await db.transaction(async (t) => await t.insert(users).values(values).returning({ userId: users.id}))