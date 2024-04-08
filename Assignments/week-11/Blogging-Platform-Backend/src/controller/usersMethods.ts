import { z } from 'zod';

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt';
import { hashPassword, verifyPassword } from '../utils/hashPassword';

const signupSchema = z.object({
    username: z.string().min(5, { message: "Username must be at least 6 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})

async function handleUserSignup(c: any) {
    const bodyData = await c.req.json();
    const res = signupSchema.safeParse(bodyData);
    // console.log(res)

    // const prisma = c.req.prisma     // get data from middleware

    // using factory library
    // const prisma = c.var.prisma;

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    if (res.success) {
        // signup logic here
        const { username, email, password } = res.data;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (existingUser) {
            c.status(400)
            return c.json({
                msg: "Email ID already registered"
            })
        } else {
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: await hashPassword(password)
                }
            })

            return c.json({
                msg: "User successfully created",
                id: user.id
            })
        }
    } else {
        c.status(400)
        let errMsg: string[] = [];
        res.error.issues.forEach((each) => {
            errMsg.push(each.message)
        })
        return c.json({
            errMsg
        })
    }
}

const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
})

async function handleUserSignin(c: any) {
    const bodyData = await c.req.json();
    const res = signinSchema.safeParse(bodyData);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    if (res.success) {
        const { email, password } = res.data;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (user) {
            const isCorrectPassword = await verifyPassword(user.password, password);
            if (isCorrectPassword) {
                const token = await sign(user.id, c.env.JWT_TOKEN);
                return c.json({
                    token
                })
            } else {
                c.status(403)
                return c.json({
                    msg: "Invalid password"
                })
            }
        } else {
            c.status(403)
            return c.json({
                msg: "User is not registered"
            })
        }
    } else {
        c.status(400)
        let errMsg: string[] = [];
        res.error.issues.forEach((each) => {
            errMsg.push(each.message)
        })
        return c.json({
            errMsg
        })
    }
}

export {
    handleUserSignup,
    handleUserSignin
}