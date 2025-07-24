import { z } from "zod/v4"
// import { serverSupabaseServiceRole } from '#supabase/server'
import { removeUser } from "~~/server/services/user-utils"

const requestBodySchema = z.object({
    uuid: z.uuid().readonly()
})

export default defineEventHandler( async (event) => {
    try {
        const { uuid } = await readValidatedBody(event, requestBodySchema.parse)
        return await removeUser(event, uuid)
    } catch (error) {
        if (error instanceof Error) {
            throw createError({
                statusCode: 400,
                message: error.message
            })
        } else console.error('Caught an unknown error: ', error)        
    }

})