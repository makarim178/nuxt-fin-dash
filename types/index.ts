import type { Placeholder, SQL } from "drizzle-orm"
import type { InsertLocationSchema, InsertUserContactSchema, InsertUserSchema } from "~/db/supabase/schema"

export {}
declare global {
    type MenuItemType = {
        id: string
        name: string
        icon: string
        link: string
        hasNewUpdate?: boolean
    } 

    type UserRequestBodyType = InsertUserSchema & {        
        address?: InsertLocationSchema[] | any[],
        contacts?: InsertUserContactSchema[] | any[],
        images?: string[] | any[]
    }
    
    type UpdateDeleteActionType = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default'

    type ChangeType = {
        [key: string]: number
    }

    type AccountsOverviewQueryRow = {
        [x: string]: any
        month: number
        year: number
        issueType?: string
        totalBalance: number
    }

    type AccountsOverviewResultType = AccountsOverviewQueryRow & {
        change: number
        title: string
    }
}

