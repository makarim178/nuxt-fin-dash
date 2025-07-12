import { eq } from "drizzle-orm";
import { user } from "../schema";
import { db } from "~/server/db-services";

export const getUser = async (userId: number) => {
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

export const addUser = async (values: InsertUserType): Promise<{userId: number}[]> => 
    await db.transaction(async (t) => await t.insert(user).values(values).returning({ userId: user.id}))