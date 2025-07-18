
export function capitalizedWordsWithUnderscore (word: string): string {
    return word.split('_').reduce((wd: string, acc: string, index: number) => {
        if (index > 0 ) acc += ' '
        acc += `${wd.charAt(0).toUpperCase()}${wd.slice(1)}`
        return acc
    }, '')
}

export function handleToastErrorMsg(error: unknown, unknownMsg: string = 'Something unexpected occurred. Please try again!'): string { 
    if(error instanceof Error) return error.message
    console.error(error) 
    return unknownMsg
}