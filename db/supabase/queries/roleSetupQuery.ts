import { db } from "~/server/db-services"
import { userRoleTypes, type InsertUserRoleSchema } from "../schema"

export const addRoles = async (roles: InsertUserRoleSchema[]): Promise<{roleId: number}[]> => 
    await db.insert(userRoleTypes).values(roles).returning({ roleId: userRoleTypes.id})