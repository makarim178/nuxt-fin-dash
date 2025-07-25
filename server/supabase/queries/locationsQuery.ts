import { db } from '@@/server/db-services';
import { locations } from '#shared/schema';
import type { InsertLocationSchema } from '#shared/schema';

export const addLocations = async (locs: InsertLocationSchema[]): Promise<{ locationId: number}[]> => 
    await db.transaction(async (t) => 
        await t.insert(locations).values(locs).returning({ locationId: locations.id}))

