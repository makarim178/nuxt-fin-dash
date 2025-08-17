export const randomNumber = (max: number): number => Math.floor(Math.random() * max)

export const generateReferenceId = () => `${crypto.randomUUID()}-${Date.now()}`
export const generateUUId = () => crypto.randomUUID()

export const getListOfIds = (count: number, callback: () => string) => {
    let result: string[] = []

    for (let i = 0; i < count; i++ ) {
        result.push(callback())
    }

    return result
}

export const getRamdomNumberRange = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)
export const getRamdomNumberInFloat = (min: number, max: number) => +(Math.random() * (max - min) + min).toFixed(2)

export const getFormatedDate = (date: Date) => `${date.getFullYear()}-${(date.getMonth()+ 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
export const getStartAndEndDate = () => {
    const currentDate = new Date()
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    return [startDate, endDate]
}

export const getRandomDateRanges = (sd:Date, ed:Date):Date => {
    const startTimestamp = sd.getTime()
    const endTimestamp = ed.getTime()

    const randomTimestamp = endTimestamp + Math.random() * (endTimestamp - startTimestamp)
    return new Date(randomTimestamp)
}