
import { z } from 'zod/v4';
import { userRoleSchema } from '../schema';


export type RolesSelectResponseSchema = z.output<typeof rolesSelectResponseSchema>


export const rolesSelectResponseSchema = z.object({
    roles: z.array(userRoleSchema.pick({ id: true, role: true})),
    rolesCount: z.number()
})