import { serverSupabaseUser } from '#supabase/server'
import { z } from 'zod/v4'
import { getUser } from "~~/server/supabase/queries/userQuery"
// import { z } from "zod/v4"
// import userData from "@/utils/user-data"

// const requestBodySchema = z.object({
//     userId: z.string()
// })

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const user = await serverSupabaseUser(event)
        // const { userId } = await getValidatedQuery(event, requestBodySchema.parse)
        // console.log(userId)
        if (!user?.id) throw new Error('User Id is not defined!')
        const { id, is_anonymous } = user
        const userId = z.uuid().parse(is_anonymous ? config.public.guestUser : id)
        return await getUser(userId)
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
// export default defineEventHandler(async (event) => {
//     const user = await getUser(1)
//     return new Promise((resolve) => {
//         setTimeout(()=> resolve(user), 2000)
//     })
// })
// export default defineEventHandler(async (event) => {
//     const config = useRuntimeConfig(event)
//     const apiResponse:any = await $fetch(config.public.userApiUrl).then(res => res)
//     return userData(apiResponse.results[0])
// })

//9c024b68-f179-41fc-91a8-8c4fa6e1043a

// {                                                                                                                     12:20:48 a.m.
//   id: 'b1f83f4f-cbf2-4d6e-a1c4-a51c644c49d2',
//   aud: 'authenticated',
//   role: 'authenticated',
//   email: '',
//   phone: '',
//   last_sign_in_at: '2025-07-24T06:20:36.48567Z',
//   app_metadata: {},
//   user_metadata: {},
//   identities: [],
//   created_at: '2025-07-24T06:20:36.479685Z',
//   updated_at: '2025-07-24T06:20:36.490683Z',
//   is_anonymous: true
// }

// {                                                                                                                     12:21:26 a.m.
//   id: '2987129a-cadc-40ee-acc4-58a9c5ac23ad',
//   aud: 'authenticated',
//   role: 'authenticated',
//   email: 'makarim178@gmail.com',
//   email_confirmed_at: '2025-07-22T08:54:44.938023Z',
//   phone: '',
//   confirmation_sent_at: '2025-07-22T08:54:00.881401Z',
//   confirmed_at: '2025-07-22T08:54:44.938023Z',
//   last_sign_in_at: '2025-07-24T06:21:26.376156Z',
//   app_metadata: { provider: 'email', providers: [ 'email' ] },
//   user_metadata: {
//     email: 'makarim178@gmail.com',
//     email_verified: true,
//     phone_verified: false,
//     sub: '2987129a-cadc-40ee-acc4-58a9c5ac23ad'
//   },
//   identities: [
//     {
//       identity_id: '893a2900-9829-44df-a2b6-d385036167f4',
//       id: '2987129a-cadc-40ee-acc4-58a9c5ac23ad',
//       user_id: '2987129a-cadc-40ee-acc4-58a9c5ac23ad',
//       identity_data: [Object],
//       provider: 'email',
//       last_sign_in_at: '2025-07-22T08:54:00.875815Z',
//       created_at: '2025-07-22T08:54:00.875861Z',
//       updated_at: '2025-07-22T08:54:00.875861Z',
//       email: 'makarim178@gmail.com'
//     }
//   ],
//   created_at: '2025-07-22T08:54:00.872016Z',
//   updated_at: '2025-07-24T06:21:26.378549Z',
//   is_anonymous: false
// }