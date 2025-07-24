import type { UserContactDataSchema
    // , UserRegPayloadSchema
    // , UserRequestBodySchema 
} from "../../shared/types"


// export const refineUserRawDataForRegistration = (id: string, { title, firstName, lastName, email, role}: UserRegPayloadSchema ): UserRequestBodySchema => {
//     const contacts = refineUserContactData({
//         contactType: 'email',
//         contact: email,
//         countryCode: null, 
//         isPrimary: true,
//         isValid: true
//     })
//     return {
//         id: id,
//         title, 
//         firstName,
//         lastName,
//         roleTypeId: role,
//         contacts
//     }
// }


export const refineUserContactData = (payload: UserContactDataSchema) => ([{
    ...payload
}])