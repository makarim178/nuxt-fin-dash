import { db } from '@@/server/db-services';
import { locations } from '#shared/types';
import type { InsertLocationSchema } from '#shared/types';

export const addLocations = async (locs: InsertLocationSchema[]): Promise<{ locationId: number}[]> => 
    await db.transaction(async (t) => 
        await t.insert(locations).values(locs).returning({ locationId: locations.id}))

