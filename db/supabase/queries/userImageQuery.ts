import { db } from "~/server/db-services";
import { userImages } from "../schema";

export const addUserImages = async (arr: UserImageType[]): Promise<{ imageId: number }[]> => await db.transaction(
    async (t) => await t.insert(userImages)
        .values(arr)
        .returning({ imageId: userImages.id }))