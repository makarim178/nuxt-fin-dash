import { integer, pgTable, serial, index, varchar, uuid } from "drizzle-orm/pg-core";
import { cascadeOptions, creationFields } from "./commonFields";
import { userRoleSchema, userRoleTypes } from "./userRoleTypes";
import { relations } from "drizzle-orm";
import { userImages, userImageSchema } from "./userImages";
import { locations, locationSchema } from "./locations";
import { userContacts, userContactSchema } from "./userContacts";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const user = pgTable('user', {
    id: uuid().notNull().unique().primaryKey(),
    title: varchar('title', { length: 5 }),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    roleTypeId: integer('roleTypeId').notNull().references(() => userRoleTypes.id, cascadeOptions),
    ...creationFields
}, (table) => [
    index('first_name').on(table.firstName),
    index('last_name').on(table.lastName),
])

export const userRelations = relations(user, ({one, many}) => ({
    role: one(userRoleTypes, {
        fields: [user.roleTypeId],
        references: [userRoleTypes.id]
    }),
    images: many(userImages),
    contacts: many(userContacts),
    locations: many(locations)
}))

export const userSchema = createSelectSchema(user, {
    roleTypeId: (schema) => schema.min(1),
})

export const userWithRelations = userSchema.extend({
    role: userRoleSchema,
    images: z.array(userImageSchema),
    contacts: z.array(userContactSchema),
    locations: z.array(locationSchema)
}) 

export const insertUserSchema = createInsertSchema(user, {
    roleTypeId: (schema) => schema.min(1)
})

export const userAuthLoginSchema = z.object({
    email: z.email('Invalid Email'),
    password: z.string()
        .regex(new RegExp('.*[A-Z].*'), 'Must contain one uppercase character')
        .regex(new RegExp('.*[a-z].*'), 'Must contain one lowercase character')
        .regex(new RegExp('.*\\d.*'), 'Must contain one number')
        .regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), 'Must contain one special charater')
        .min(8, 'Must be atleast 8 characters')
})

export const titleSchema = z.literal(['Mr.', 'Ms.', 'Mrs.'])

export const userAuthRegisterSchema = userAuthLoginSchema.extend({
    title: titleSchema,
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.email('Invalid e-mail'),
    role: z.number().min(1),
    confirmPassword: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

export type TitleSchema = z.infer<typeof titleSchema>
export const userRequestBodySchema = insertUserSchema.extend({
    id: z.uuid(),
    address: z.array(insertLocationSchema.omit({ userId: true})).optional(),
    contacts: z.array(insertUserContactSchema.omit({ userId: true })).optional(),
    images: z.array(z.string()).optional()
})

export const userRegisterBodySchema = insertUserSchema.omit({ id: true }).extend({
    email: z.string(),
    password: z.string(),
    images: z.array(z.string()).optional()
})
export type UserSchema = z.infer<typeof userSchema>
export type InsertUserSchema = z.infer<typeof insertUserSchema>
export type UserWithRelationSchema = z.infer<typeof userWithRelations>


export type UserRequestBodySchema = z.infer<typeof userRequestBodySchema>
export type UserRegisterBodySchema = z.infer<typeof userRegisterBodySchema>


export type UserAuthLoginSchema = z.output<typeof userAuthLoginSchema>
export type UserAuthRegisterSchema = z.output<typeof userAuthRegisterSchema>
export type UserRegPayloadSchema = Pick<UserAuthRegisterSchema, 'title' | 'firstName' | 'lastName' | 'email' | 'role'>
// export type User = InferSelectModel<typeof user>
// export type InsertUser = InferInsertModel<typeof user>

