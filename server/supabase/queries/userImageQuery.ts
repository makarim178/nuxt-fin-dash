import { db } from '@@/server/db-services';
import { userImages } from '#shared/types';
import type { InsertUserImageSchema } from '#shared/types';

export const addUserImages = async (arr: InsertUserImageSchema[]): Promise<{ imageId: number }[]> => await db.transaction(
    async (t) => await t.insert(userImages)
        .values(arr)
        .returning({ imageId: userImages.id }))