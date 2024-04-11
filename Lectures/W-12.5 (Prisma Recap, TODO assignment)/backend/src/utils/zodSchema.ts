import { z } from "zod";

export const signupSchema = z.object({
    firstName: z.string().transform(value => value.replace(/\s{2,}/g, ' ').trim())
        .pipe(z.string().min(1, { message: "First Name is required" })),

    lastName: z.string().trim().optional().default("")
        .transform(value => value.replace(/\s{2,}/g, ' ').trim()),

    email: z.string().trim()
        .email({ message: "Invalid email format" }),

    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(16, { message: "Password cannot be more than 16 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{6,16}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and no whitespace" }),

    confirmPassword: z.string(),

    agreeToTerms: z.boolean()

})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    })
    .refine(data => data.agreeToTerms === true, {
        message: "You must agree to the terms and conditions",
        path: ['agreeToTerms']
    })


export const signInSchema = z.object({
    email: z.string().trim()
        .email({ message: "Invalid email format" }),

    password: z.string()
        .min(6, { message: "Your password must be at least 6 characters long" })
        .max(16, { message: "Your password cannot be more than 16 characters" })
})

export const createTodoSchema = z.object({
    title: z.string().trim()
        .min(5, { message: "Ttile must be at least 5 characters long" }),

    description: z.string().trim()
        .min(10, { message: "Your description must be at least 10 characters long" })
        .max(150, { message: "Your description cannot be exceed more than 150 characters" })
})

export const updateTodoSchema = z.object({
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    done: z.boolean().optional(),
})
