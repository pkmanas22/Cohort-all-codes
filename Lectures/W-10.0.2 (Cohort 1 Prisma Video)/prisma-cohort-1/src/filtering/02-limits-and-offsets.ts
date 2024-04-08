
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({log:['query','info']});

async function main() {
    // Write your logic

    // SELECT * FROM question OFFSET 0 LIMIT 5      --> 1-5
    // SELECT * FROM question OFFSET 10 LIMIT 5     --> 11-15
    // SELECT * FROM question OFFSET 20 LIMIT 5     --> 21-25

    const users = await prisma.user.findMany({
        take: 1,    // limit    Limiting the number of users to 1
        skip: 2     // offset  Skipping the first 2 users
    });
    console.log(users);
}

main()
    .then(async () => {
        console.log("Done");
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect()
        process.exit(1)
    })