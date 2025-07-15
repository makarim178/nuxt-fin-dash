import { addUserImages } from "~/db/supabase/queries/userImageQuery"
import { insertUserImageSchema } from "~/db/supabase/schema"

export default defineEventHandler(async (event) => {
    const { userId, images } = await readBody(event)
    const imagesObj = images.map((url: string) => ( insertUserImageSchema.parse({ userId, imageUrl: url})))
    const addImages = await addUserImages(imagesObj)
    return new Response( JSON.stringify(addImages))
})