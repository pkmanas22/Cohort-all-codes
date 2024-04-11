import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string(),
    password: z.string()
})

export type signupParams = z.infer<typeof signUpSchema>