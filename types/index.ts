import type { Placeholder, SQL } from "drizzle-orm"
import type { UserRoleTypes } from "~/db/supabase/schema"

export {}
declare global {
    type MenuItemType = {
        id: string
        name: string
        icon: string
        link: string
        hasNewUpdate?: boolean
    } 

    type UserRoleApiRequestBodyType = {
        types: string[] | string
    }

    type UserApiObjectType = UserType & {
        location: {
            street: {
                number: number | string
                name: string
            }
            city: string
            state: string
            country: string
            postcode: number | string
            coordinates: {
                latitude: string
                longitude: string
            }
            timezone: {
                offset: string
                description: string
            }
        }
        id: {
            name: string
            value: string
        }
        login: {
            uuid: string
            username: string
            password: string
            salt: string
            md5: string
            sha1: string
            sha256: string
        }
        dob: {
            date: string
            age: number
        }
        registered: {
            date: string
            age: number
        }
        nat: string
    }

    type ApiInfoType = {
        seed: string
        results: number
        page: number
        version: number
    }

    type UserApiResponseType = {
        results: UserApiObjectType[]
        info: ApiInfoType
    } | {}

    type UserRequestBodyType = InsertUserType & {        
        address?: UserAddressType[] | any[],
        contacts?: ContactType[] | any[],
        images?: string[] | any[]
    }

    type UserAddressType = {
        streetNumber: string
        streetName: string
        postcode: string
        cityId: number
        provinceId: number
        countryId: number
        isValid: boolean
        isPrimamry: boolean
    }

    type InsertAddresType = UserAddressType & {
        userId: number
    }

    type CreationFieldsType = {
        createdAt?: string | SQL<unknown> | Placeholder<string, any> | undefined
        updatedAt?: string | SQL<unknown> | Placeholder<string, any> | undefined
    }

    
    type InsertUserType = { 
        roleTypeId: number | SQL<unknown> | Placeholder<string, any>
        id?: number | SQL<unknown> | Placeholder<string, any> | undefined
        title?: string | SQL<unknown> | Placeholder<string, any> | null | undefined
        firstName?: string | SQL<unknown> | Placeholder<string, any> | null | undefined
        lastName?: string | SQL<unknown> | Placeholder<string, any> | null | undefined
        dob?: string | SQL<unknown> | Placeholder<string, any> | null | undefined
    } & CreationFieldsType
    
    type UpdateDeleteActionType = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default'
    type ContactType = {
        id?: number | SQL<unknown> | Placeholder<string, any>
        userId: number | SQL<unknown> | Placeholder<string, any>
        contactType: string | SQL<unknown> | Placeholder<string, any> | null | undefined
        contact: string | SQL<unknown> | Placeholder<string, any> | null | undefined
        countryCode: string | SQL<unknown> | Placeholder<string, any> | null | undefined
        isValid: boolean | SQL<unknown> | undefined
        isPrimary: boolean | SQL<unknown> | undefined
    } & CreationFieldsType
    
    type UserImageType = {
        id?: number | SQL<unknown> | Placeholder<string, any>
        userId: number | SQL<unknown> | Placeholder<string, any> 
        imageUrl: string | SQL<unknown> | Placeholder<string, any> | null | undefined; 
    } & CreationFieldsType
    
    type UserType = InsertUserType & {
        contacts: ContactType[]
        images: UserImageType[]
        address: UserAddressType[]
        role: UserRoleTypes
    }
}