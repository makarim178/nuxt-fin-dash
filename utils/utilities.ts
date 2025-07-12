export function capitalizedWordsWithUnderscore (word: string): string {
    return word.split('_').reduce((wd: string, acc: string, index: number) => {
        if (index > 0 ) acc += ' '
        acc += `${wd.charAt(0).toUpperCase()}${wd.slice(1)}`
        return acc
    }, '')
}

export function addElementToObject(arr: UserAddressType[] | ContactType[] | UserImageType[], object: Object): any[]{ 
    return arr.map((element: Object) => ({ ...element, ...object}))
}