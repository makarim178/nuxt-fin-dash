import { serverSupabaseServiceRole } from '#supabase/server'
import type { H3Event, EventHandlerRequest } from 'h3'

export const removeUser = async (event: H3Event<EventHandlerRequest>, uuid: string) => {
    try {
        const client = serverSupabaseServiceRole(event)
        await client.auth.admin.deleteUser(uuid)
        return {
            success: true,
            message: 'User removed'
        }        
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: `Could not remove user`
        }
    }
}