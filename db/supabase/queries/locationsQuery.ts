import { db } from "~/server/db-services";
import { locations } from "../schema";

export const addLocations = async (locs: InsertAddresType[]): Promise<{ locationId: number}[]> => 
    await db.transaction(async (t) => 
        await t.insert(locations).values(locs).returning({ locationId: locations.id}))

