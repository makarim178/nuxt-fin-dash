type ReturnCurrPrevType = {
    year: number
    currentMonth: string
    previousMonth: string
}

type LocalMonthOptionType = { month: 'long' | 'numeric' | '2-digit' | 'short' | 'narrow' | undefined }
const currentDate = new Date()
const dateOnPrevMonth = new Date(currentDate)
dateOnPrevMonth.setDate(0)

const localeMonthOption: LocalMonthOptionType = {
    month: 'long'
}

export function getCurrentWithPrev(): ReturnCurrPrevType {
    return {
        year: currentDate.getFullYear(),
        currentMonth: currentDate.toLocaleString('default', localeMonthOption),
        previousMonth: dateOnPrevMonth.toLocaleString('default', localeMonthOption)
    }
}