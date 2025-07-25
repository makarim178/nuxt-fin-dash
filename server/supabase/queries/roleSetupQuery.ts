import { db } from '@@/server/db-services'
import { userRoleTypes } from '#shared/schema'
import type { InsertUserRoleSchema } from '#shared/schema'

export const getRoles = async (): Promise<{id: number; role: string}[]> => await db.select({
    id: userRoleTypes.id,
    role: userRoleTypes.role
}).from(userRoleTypes)

export const addRoles = async (roles: InsertUserRoleSchema[]): Promise<{roleId: number}[]> => 
    await db.insert(userRoleTypes).values(roles).returning({ roleId: userRoleTypes.id})