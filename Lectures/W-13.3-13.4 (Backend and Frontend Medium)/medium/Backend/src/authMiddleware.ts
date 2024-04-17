import { verify } from "hono/jwt";
import prismaGenerator from "./prisma";
import { Context } from "hono";

export const authMiddleware = async (c: Context, next: () => {}) => {
    const authHeader = c.req.header("authorization") || " ";

    const token = authHeader.split(' ')[1];
    // console.log(token)
    if (!token) {
        // c.status(401);
        // return c.json({
        //     msg: "Invalid token"
        // })
        c.set('loggedIn', false);
        await next();
    }

    const prisma = await prismaGenerator(c.env.DATABASE_URL);

    try {
        const userId = await verify(token, c.env.SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })
        if (!user) {
            c.status(401);
            return c.json({
                msg: "Invalid userId and password"
            })
        }
        // console.log(user);
        
        c.set('user', user);
        c.set('loggedIn', true);
        await next();
    } catch (error) {
        c.status(403);
        return c.json({
            msg: "Error while fetching data"
        })
    }
}