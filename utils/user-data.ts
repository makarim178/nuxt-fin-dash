export default function(userApiResponse: any): UserType {
    const { 
        gender,
        name,
        email,
        login,
        phone,
        cell,
        picture

    } = userApiResponse
    return {
        gender,
        name,
        email,
        login,
        phone,
        cell,
        picture
    }
}