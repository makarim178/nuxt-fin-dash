import userData from "~/utils/user-data"

export default defineEventHandler(async event => {
    const config = useRuntimeConfig(event)    
    const apiResponse:any = await $fetch(config.public.userApiUrl).then(res => res)
    return userData(apiResponse.results[0])
})