import { sign } from "hono/jwt";
import prismaGenerator from "../prisma";
import { Context } from "hono";
import { signInSchema, signupSchema } from "@manaskp/commonmedium";

export const handleUserSignup = async (c: Context) => {
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
        name,
        email,
        password,
    } = response.data;

    const prisma = await prismaGenerator(c.env.DATABASE_URL)

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (existingUser) {
            c.status(401);
            return c.json({
                msg: 'User already exists in database.'
            })
        }

        const newUser = await prisma.user.create({
            data: {
                name: name || "",
                email,
                password,
            }
        })


        const token = await sign(newUser.id, c.env.SECRET);

        return c.json({
            name: newUser.name,
            token
        })

    } catch (error) {
        // console.log(error);
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}

export const handleUserSignin = async (c: Context) => {
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

    const prisma = await prismaGenerator(c.env.DATABASE_URL);

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
                password,
            }
        })

        if (!existingUser) {
            c.status(401);
            return c.json({
                msg: 'User does not exist in database.'
            })
        }
        const token = await sign(existingUser.id, c.env.SECRET);
        return c.json({
            userId: existingUser.id,
            name: existingUser.name,
            token
        })
    }
    catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}

