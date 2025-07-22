import { z } from "zod/v4"
import { getUser } from "~~/server/supabase/queries/userQuery"
// import userData from "@/utils/user-data"

const requestBodySchema = z.object({
    userId: z.string()
})

export default defineEventHandler(async (event) => {
    try {
        const { userId } = await getValidatedQuery(event, requestBodySchema.parse)
        console.log(userId)
        return await getUser(userId)       
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
// export default defineEventHandler(async (event) => {
//     const user = await getUser(1)
//     return new Promise((resolve) => {
//         setTimeout(()=> resolve(user), 2000)
//     })
// })
// export default defineEventHandler(async (event) => {
//     const config = useRuntimeConfig(event)
//     const apiResponse:any = await $fetch(config.public.userApiUrl).then(res => res)
//     return userData(apiResponse.results[0])
// })