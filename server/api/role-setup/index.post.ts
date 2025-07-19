import { addRoles } from "~~/server/supabase/queries/roleSetupQuery"
import { insertUserRoleSchema } from "#shared/types"
import { z } from "zod/v4"

const roleEntrySchema = z.object({ roles: z.array(z.string()).or(z.string())})
const parseDataSchema = z.array(insertUserRoleSchema)

export default defineEventHandler(async (event) => {
    try {
        const { roles } = await readValidatedBody(event, roleEntrySchema.parse)
        if (!Array.isArray(roles)) throw new Error('roles must be an Array')
        const parsedData = parseDataSchema.parse(roles.map(el => {
            const parsed = insertUserRoleSchema.parse({role: el})
            return parsed
        }))
        const query = await addRoles(parsedData)
        return new Response(JSON.stringify({
            roleTypes: query
        }))
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