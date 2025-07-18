import { db } from '@@/server/db-services';
import { userContacts } from '#shared/types';
import type { InsertUserContactSchema } from '#shared/types'

export const addContacts = async (contactValues: InsertUserContactSchema[]) => await db.transaction(async (t) => 
    await t.insert(userContacts).values(contactValues).returning({ contactId: userContacts.id }))