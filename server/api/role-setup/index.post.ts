import { addRoles } from "~/db/supabase/queries/roleSetupQuery"
import { insertUserRoleSchema, userRoleTypes } from "~/db/supabase/schema/userRoleTypes"
import { db } from "~/server/db-services"

export default defineEventHandler(async (event) => {
    try {
        const { types } = await readBody(event) as { types: string[] | [] }
        if (!Array.isArray(types)) throw Error('types must be an Array')
        const parsedData = types.map(el => {
            const parsed = insertUserRoleSchema.parse({type: el})
            return parsed
        })
        const query = await addRoles(parsedData)
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