import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUser(username: string) {
    const res = await prisma.user.findFirst({
        where: {
            email: username
        }
    })
    console.log("Selected User: ");
    console.log(res);
}

getUser('kirat1@gmail.com');