import { getUser } from "~~/server/supabase/queries/userQuery"
// import userData from "@/utils/user-data"

export default defineEventHandler(async () => await getUser(1))
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