import { addUserImages } from "~~/server/supabase/queries/userImageQuery"
import { insertUserImageSchema } from "#shared/types"
import { z } from "zod/v4"

const requestBodySchema = z.object({
    userId: z.number().min(1),
    images: z.array(z.string())
})

export default defineEventHandler(async (event) => {
    const { userId, images } = await readValidatedBody(event, requestBodySchema.parse)
    const imagesObj = images.map((url: string) => ( insertUserImageSchema.parse({ userId, imageUrl: url})))
    const addImages = await addUserImages(imagesObj)
    return new Response( JSON.stringify(addImages))
})