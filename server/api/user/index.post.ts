import { addContacts } from "~~/server/supabase/queries/contactsQuery"
import { addUserImages } from "~~/server/supabase/queries/userImageQuery"
import { addUser, getUser } from "~~/server/supabase/queries/userQuery"
import { 
    insertUserImageSchema, 
    insertUserSchema, 
    userRegisterBodySchema } from "#shared/types"
import { db } from "~~/server/db-services"
import { getRandomUserImage } from "~~/server/utils/user-utils"
import { serverSupabaseClient } from '#supabase/server'
import { removeUser } from "~~/server/services/user-utils"

export default defineEventHandler (async (event) => {
    try {
        const { 
            password,
            email,
            title,
            firstName,
            lastName,
            roleTypeId,
            images
        } = await readValidatedBody(event, userRegisterBodySchema.parse)

        const client = await serverSupabaseClient(event)
            
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password
        })

        if (error) throw error

        const uuid = data?.user?.id

        if (!uuid) throw new Error('Could not generate User Id!') 
            
        const result = await db.transaction(async () => {
            const newUserId = { userId: uuid}
            await addUser( insertUserSchema.parse({ id: uuid, title, firstName, lastName, roleTypeId }))
            const promises = []
            promises.push(addContacts([{
                userId: uuid,
                contactType: 'email',
                countryCode: null,
                contact: email,
                isValid: true,
                isPrimary: true
            }]))
            
            let parsedImages = []
            if (images) {            
                parsedImages = images.map((url: string) => (insertUserImageSchema.parse({imageUrl: url, ...newUserId})))
            } else {
                parsedImages = [{
                    userId: uuid,
                    imageUrl: getRandomUserImage(title ?? 'Mr.')
                }]
            }
            promises.push(addUserImages(parsedImages))
    
            if (promises.length > 0) {
                await Promise.allSettled(promises)
                    .then(results => results)
                    .catch((error) => new Error(error.message))
            }
    
            return await getUser(uuid)
        })

        if (!result) await removeUser(event, uuid)

        return new Response(JSON.stringify(result))

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