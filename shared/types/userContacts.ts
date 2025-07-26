import type { UserContactSchema } from '../schema';


export type UserContactDataSchema = Pick<UserContactSchema, 'contactType' | 'contact' | 'countryCode' | 'isValid' | 'isPrimary'> 