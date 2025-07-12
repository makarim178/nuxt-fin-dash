import { addUserImages } from "~/db/supabase/queries/userImageQuery"

export default defineEventHandler(async (event) => {
    const { images } = await readBody(event)
    const imagesObj = images.map((url: string) => ({ userId: 6, imageUrl: url}))

    const addImages = await addUserImages(imagesObj)
    return new Response( JSON.stringify(addImages))
})