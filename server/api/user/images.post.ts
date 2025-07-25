import { addUserImages } from "~~/server/supabase/queries/userImageQuery"
import { insertUserImageSchema } from "#shared/schema"
import { z } from "zod/v4"

const requestBodySchema = z.object({
    userId: z.number().min(1),
    images: z.array(z.string())
})

export default defineEventHandler(async (event) => {
    try {
        const { userId, images } = await readValidatedBody(event, requestBodySchema.parse)
        const imagesObj = images.map((url: string) => ( insertUserImageSchema.parse({ userId, imageUrl: url})))
        const addImages = await addUserImages(imagesObj)
        return new Response(JSON.stringify(addImages))        
    } catch (error) {
        if (error instanceof Error) {
            throw createError({
                statusCode: 400,
                message: error.message
            })
        } else {
            console.error('Caught an unknown Error: ', error)
        }
    }
})