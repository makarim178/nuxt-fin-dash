import { getRoles } from "~~/server/supabase/queries/roleSetupQuery"
import { rolesSelectResponseSchema } from "~~/shared/types";

export default defineEventHandler(async () => {
  try {
    const roles: {id: number; role: string}[] = await getRoles()
    const rolesArr = roles.reduce((acc: string[], { role }) => {
      acc.push(role)
      return acc
    } , [])
    return rolesSelectResponseSchema.parse({
      roles: rolesArr,
      rolesCount: rolesArr.length
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
