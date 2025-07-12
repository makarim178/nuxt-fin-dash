import { db } from "~/server/db-services";
import { userContacts } from "../schema";

export const addContacts = async (contactValues: ContactType[]) => await db.transaction(async (t) => 
    await t.insert(userContacts).values(contactValues).returning({ contactId: userContacts.id }))