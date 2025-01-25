import {z} from 'zod'

export const userSigninSchema = z.object({
    email: z.string().email('Email must be a valid email'),
    password: z.string().min(8, "Password must be at least 8 characters")
})