
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


// const authMiddleware = async (c: {
//     env: {
//         DATABASE_URL: string,
//         JWT_TOKEN: string,
//     }, req: {
//         header: (arg0: string) => any,
//         userId: string,
//     }, status: (arg0: number) => void,
//     json: (arg0: {
//         errMsg: string,
//     }) => any,
// }, next: () => any) => {         // this will complain while passing in middleware

const authMiddleware = async (c:any, next: any) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const authorizationValue = c.req.header('Authorization');
    if (!authorizationValue) {
        c.status(400)
        return c.json({
            errMsg: "Unauthorized user"
        })
    }
    const token = authorizationValue.split(" ")[1]

    try {
        const id = await verify(token, c.env.JWT_TOKEN)
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user) {
            c.req.userId = user.id;
            await next();
        }
    } catch (error) {
        c.status(404)
        return c.json({
            errMsg: "User is not registered"
        })
    }
}
export default authMiddleware;