import { addContacts } from "~/db/supabase/queries/contactsQuery"
import { addLocations } from "~/db/supabase/queries/locationsQuery"
import { addUserImages } from "~/db/supabase/queries/userImageQuery"
import { addUser, getUser } from "~/db/supabase/queries/userQuery"
import { db } from "~/server/db-services"
import { addElementToObject } from "~/utils/utilities"

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
            const insertUser = await addUser({ title, firstName, lastName, dob, roleTypeId })
            
            if (!insertUser[0].userId) throw Error( "User could not be created")
                
            const newUserId = { userId: insertUser[0].userId}
            const promises = []
            if (address) promises.push(addLocations(addElementToObject(address, newUserId)))
            if (contacts) promises.push(addContacts(addElementToObject(contacts, newUserId)))
            
            let imageObj: UserImageType[] = []
            if (images) {            
                imageObj = images.map((url: string) => ({imageUrl: url, ...newUserId}))
                promises.push(addUserImages(imageObj))
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