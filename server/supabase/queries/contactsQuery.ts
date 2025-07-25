import { db } from '@@/server/db-services';
import { userContacts } from '#shared/schema';
import type { InsertUserContactSchema } from '#shared/schema'

export const addContacts = async (contactValues: InsertUserContactSchema[]) => await db.transaction(async (t) => 
    await t.insert(userContacts).values(contactValues).returning({ contactId: userContacts.id }))