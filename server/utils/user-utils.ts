const config = useRuntimeConfig()
const randUserBodyUrl = 'portraits/med/'

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

export const getRandomUserImage = (title: string | 'Mr.' | 'Ms.' | 'Mrs.' ) => {
    const genderUrl = title === 'Mr.' ? 'men' : 'women'
    return `${config.public.userApiUrl}${randUserBodyUrl}${genderUrl}/${getRandomNumber(0,98)}.jpg`
}