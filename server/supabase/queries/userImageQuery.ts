import { db } from '@@/server/db-services';
import { userImages } from '#shared/schema';
import type { InsertUserImageSchema } from '#shared/schema';

export const addUserImages = async (arr: InsertUserImageSchema[]): Promise<{ imageId: number }[]> => await db.transaction(
    async (t) => await t.insert(userImages)
        .values(arr)
        .returning({ imageId: userImages.id }))