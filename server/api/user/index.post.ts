import { addContacts } from "~~/server/supabase/queries/contactsQuery"
import { addLocations } from "~~/server/supabase/queries/locationsQuery"
import { addUserImages } from "~~/server/supabase/queries/userImageQuery"
import { addUser, getUser } from "~~/server/supabase/queries/userQuery"
import { 
    insertLocationSchema, 
    insertUserContactSchema, 
    insertUserImageSchema, 
    insertUserSchema } from "#shared/types"
import { db } from "~~/server/db-services"
import { z } from "zod/v4"

const requestBodySchema = insertUserSchema.extend({
    address: z.array(insertLocationSchema),
    contacts: z.array(insertUserContactSchema),
    images: z.array(z.string())
})

export default defineEventHandler (async (event) => {
    try {
        const { 
            title,
            firstName,
            lastName,
            dob,
            roleTypeId,
            address,
            contacts,
            images
        } = await readValidatedBody(event, requestBodySchema.parse)

        const result = await db.transaction(async () => {
            const insertUser = await addUser( insertUserSchema.parse({ title, firstName, lastName, dob, roleTypeId }))
            
            if (!insertUser[0].userId) throw Error( "User could not be created")
                
            const newUserId = { userId: insertUser[0].userId}
            const promises = []
            if (address) {
                const userLocations = address.map(add => insertLocationSchema.parse({ ...add, ...insertUser}))
                promises.push(addLocations(userLocations))
            }
            if (contacts) {
                const userContacts = contacts.map(contact => (insertUserContactSchema.parse({ ...contact, ...newUserId})))
                promises.push(addContacts(userContacts))
            }            
            
            if (images) {            
                const parsedImages = images.map((url: string) => (insertUserImageSchema.parse({imageUrl: url, ...newUserId})))

                promises.push(addUserImages(parsedImages))
            }
    
            if (promises.length > 0) {
                await Promise.allSettled(promises)
                    .then(results => results)
                    .catch((error) => new Error(error.message))
            }
    
            return await getUser(newUserId.userId)
        })
        
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