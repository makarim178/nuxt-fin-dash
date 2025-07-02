export {}
declare global {
    type MenuItemType = {
        id: string
        name: string
        icon: string
        link: string
        hasNewUpdate?: boolean
    } 

    type UserNameType = {
        title: string
        first: string
        last: string
    }
    type UserType = {
        gender: string
        name: UserNameType
        email: string
        login: {
            uuid: string
            username: string
            password: string
            salt: string
            md5: string
            sha1: string
            sha256: string
        }
        phone: string
        cell: string
        picture: {
            large: string
            medium: string
            thumbnail: string
        }
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
}