import { addContacts } from "~/db/supabase/queries/contactsQuery"
import { addLocations } from "~/db/supabase/queries/locationsQuery"
import { addUserImages } from "~/db/supabase/queries/userImageQuery"
import { addUser, getUser } from "~/db/supabase/queries/userQuery"
import { insertLocationSchema, InsertUserContactSchema, insertUserContactSchema, insertUserImageSchema, insertUserSchema } from "~/db/supabase/schema"
import { db } from "~/server/db-services"

export default defineEventHandler (async event => {
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
        } = await readBody(event) as UserRequestBodyType

        const result = await db.transaction(async (tx) => {
            const insertUser = await addUser( insertUserSchema.parse({ title, firstName, lastName, dob, roleTypeId }))
            
            if (!insertUser[0].userId) throw Error( "User could not be created")
                
            const newUserId = { userId: insertUser[0].userId}
            const promises = []
            if (address) {
                let userLocations = address.map(add => insertLocationSchema.parse({ ...add, ...insertUser}))
                promises.push(addLocations(userLocations))
            }
            if (contacts) {
                let userContacts = contacts.map(contact => (insertUserContactSchema.parse({ ...contact, ...newUserId})))
                promises.push(addContacts(userContacts))
            }            
            
            if (images) {            
                const parsedImages = images.map((url: string) => (insertUserImageSchema.parse({imageUrl: url, ...newUserId})))
                promises.push(addUserImages(parsedImages))
            }
    
            if (promises.length > 0) {
                const allPromises = await Promise.allSettled(promises)
                    .then(results => results)
                    .catch((error: any) => new Error(error.message))
            }
    
            return await getUser(newUserId.userId)
        })
        
        return new Response(JSON.stringify(result))

    } catch (error: any) {
        throw createError({
            statusCode: 400,
            message: error.message
        })
    }
})