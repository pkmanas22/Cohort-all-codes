import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Insert
async function insertUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string) {

    const res = await prisma.user.create({
        data: {
            email: username,
            firstName,
            lastName,
            password,
        }
    });
    console.log("Inserted data : ");
    console.log(res);
}

insertUser("kirat1@gmail.com", "123456", "harkirat", "singh")