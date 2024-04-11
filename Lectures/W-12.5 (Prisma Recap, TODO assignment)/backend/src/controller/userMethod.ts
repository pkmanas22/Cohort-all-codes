import { signInSchema, signupSchema } from "../utils/zodSchema";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createToken } from "../utils/jwt";

export async function handleUserSignup(c) {
    const body = await c.req.json();

    const response = signupSchema.safeParse(body);
    if (!response.success) {
        const errorObj: Record<string, string> = {};

        response.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            const value = issue.message;
            errorObj[key] = value;
        });

        c.status(400)
        return c.json(errorObj)
    }

    const {
        firstName,
        lastName,
        email,
        confirmPassword,
    } = response.data;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            c.status(401);
            return c.json({
                msg: 'User already exists in database.'
            })
        }
    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: confirmPassword,
            }
        })

        const token = await createToken(newUser.id, c.env.SECRET)

        return c.json({
            userId: newUser.id,
            fullName: `${newUser.firstName} ${newUser.lastName}`,
            token
        })

    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}

export async function handleUserSignin(c) {
    const body = await c.req.json();

    const response = signInSchema.safeParse(body);
    if (!response.success) {
        const errorObj: Record<string, string> = {};

        response.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            const value = issue.message;
            errorObj[key] = value;
        });

        c.status(400)
        return c.json(errorObj)
    }

    const {
        email,
        password,
    } = response.data;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                password
            }
        })

        if (!user) {
            c.status(401);
            return c.json({
                msg: 'User is not registered.'
            })
        }

        const token = await createToken(user.id, c.env.SECRET)

        return c.json({
            msg: {
                userId: user.id,
                fullName: `${user.firstName} ${user.lastName}`,
                token
            }
        })
    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}