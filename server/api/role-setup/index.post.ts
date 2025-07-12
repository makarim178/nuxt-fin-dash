import { addRoles } from "~/db/supabase/queries/roleSetupQuery"
import { userRoleTypes } from "~/db/supabase/schema/userRoleTypes"
import { db } from "~/server/db-services"

export default defineEventHandler(async (event) => {
    try {
        const { types } = await readBody(event) as UserRoleApiRequestBodyType
        if (!Array.isArray(types)) throw Error('types must be an Array')
        const query = await addRoles(types)
        return new Response(JSON.stringify({
            roleTypes: query
        }))
    } catch (error: any) {
        throw createError({
            statusCode: 400,
            message: error.message
        })
    }
})