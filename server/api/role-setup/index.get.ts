import { getRoles } from "~~/server/supabase/queries/roleSetupQuery"
import { rolesSelectResponseSchema } from "~~/shared/types/userRoleTypes";

export default defineEventHandler(async () => {
  try {
    const roles: {id: number; role: string}[] = await getRoles()
    return rolesSelectResponseSchema.parse({
      roles,
      rolesCount: roles.length
    })
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
