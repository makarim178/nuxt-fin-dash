import { db } from "~/server/db-services";
import { locations, type InsertLocationSchema } from "../schema";

export const addLocations = async (locs: InsertLocationSchema[]): Promise<{ locationId: number}[]> => 
    await db.transaction(async (t) => 
        await t.insert(locations).values(locs).returning({ locationId: locations.id}))

