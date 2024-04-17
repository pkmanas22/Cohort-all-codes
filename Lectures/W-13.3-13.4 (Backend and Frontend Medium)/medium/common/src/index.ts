import { z } from "zod";

const signupSchema = z.object({
    name: z.string().optional(),

    email: z.string().trim()
        .email({ message: "Invalid email format" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(16, { message: "Password cannot be more than 16 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,16}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and no whitespace" }),
})

const signInSchema = z.object({
    email: z.string().trim()
        .email({ message: "Invalid email format" }),

    password: z.string()
        .min(6, { message: "Your password must be at least 6 characters long" })
        .max(16, { message: "Your password cannot be more than 16 characters" })
})

const createPostSchema = z.object({
    title: z.string().trim()
        .min(5, { message: "Ttile must be at least 5 characters long" }),

    content: z.string().trim()
        .min(10, { message: "Your description must be at least 10 characters long" })
        .max(2000, { message: "Your description cannot be exceed more than 2000 characters" })
})

const updatePostSchema = z.object({
    title: z.string().trim().optional(),
    content: z.string().trim().optional(),
    published: z.boolean().optional(),
})


type signUpType = z.infer<typeof signupSchema>
type signInType = z.infer<typeof signInSchema>
type createPostType = z.infer<typeof createPostSchema>
type updatePostType = z.infer<typeof updatePostSchema>

export {
    signupSchema,
    signInSchema,
    createPostSchema,
    updatePostSchema,
    signUpType,
    signInType,
    createPostType,
    updatePostType,
}
