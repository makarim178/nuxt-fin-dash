import type { LocationSchema, UserContactSchema } from "~/db/supabase/schema"

export function capitalizedWordsWithUnderscore (word: string): string {
    return word.split('_').reduce((wd: string, acc: string, index: number) => {
        if (index > 0 ) acc += ' '
        acc += `${wd.charAt(0).toUpperCase()}${wd.slice(1)}`
        return acc
    }, '')
}