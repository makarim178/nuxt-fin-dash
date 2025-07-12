import { db } from "~/server/db-services"
import { userRoleTypes } from "../schema"

export const addRoles = async (roles: string[]): Promise<{roleId: number}[]> => {
    const roleTypes = roles.map(role => ({type: role}))
    return await db.insert(userRoleTypes).values(roleTypes).returning({ roleId: userRoleTypes.id})
}