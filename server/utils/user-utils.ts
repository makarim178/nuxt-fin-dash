import { getRamdomNumberRange } from "./utils"

// const config = useRuntimeConfig() ?? null
// const randUserBodyUrl = 'portraits/med/'

// export const getRandomUserImage = (title: string | 'Mr.' | 'Ms.' | 'Mrs.' ) => {
//     const genderUrl = title === 'Mr.' ? 'men' : 'women'
//     return `${config.public.userApiUrl}${randUserBodyUrl}${genderUrl}/${getRamdomNumberRange(0,98)}.jpg`
// }

const randomPortraitImageBaseUrl = 'https://randomuser.me/api/portraits/med/'
const imageExt = '.jpg'

const getGenderForImageUri = (title: 'Mr.' | 'Ms.' | 'Mrs.' | string): 'men' | 'women' | null  => {
    switch (title) {
        case 'Mr.': return 'men'    
        case 'Ms.':
        case 'Mrs.': return 'women'
        default: return null
    }
}

export const retrieveUserIdsCb = (acc: string[], { id }: { id: string }): string[] => {
    if (!id) return []
    acc.push(id)
    return acc
}

export const generateRandomImage = (title: 'Mr.' | 'Ms.' | 'Mrs.' | string) => `${randomPortraitImageBaseUrl}${getGenderForImageUri(title)}/${getRamdomNumberRange(1,99)}${imageExt}`

export const getListOfIdsWithIndex = (idx: number, count: number) => {
    let arr = []
    for (let i = 0; i < count; i++){
        arr.push(++idx)
    }
    return arr
}