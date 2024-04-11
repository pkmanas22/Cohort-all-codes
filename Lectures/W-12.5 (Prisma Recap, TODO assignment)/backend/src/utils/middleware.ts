import { PrismaClient } from "@prisma/client/edge";
import { verifyToken } from "./jwt";
import { withAccelerate } from "@prisma/extension-accelerate";

const authMiddleware = async (c: any, next: () => void) => {
    const header = c.req.header('Authorization') || "";
    const token = header.split(" ")[1];
    // console.log(token);

    if (!token) {
        c.status(400);
        return c.json({
            msg: 'Please send token'
        })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    let userId;
    try {
        userId = await verifyToken(token, c.env.SECRET);
        // console.log(userId);
    } catch (error) {
        c.status(401);
        return c.json({
            msg: 'Invalid User ID'
        })
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        if (!existingUser) {
            c.status(401);
            return c.json({
                msg: 'User is not login yet.'
            })
        }

        // c.user = existingUser;
        c.set('user', existingUser)
        await next();

    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}

export default authMiddleware;