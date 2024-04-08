import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    const res = await prisma.user.create({
        data: {
            username,
            password,
            name
        }
    })
    // console.log("create user")
    // console.log(res)
    return res;
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    })
    // console.log("get user")
    // console.log(user)
    return user;
}
