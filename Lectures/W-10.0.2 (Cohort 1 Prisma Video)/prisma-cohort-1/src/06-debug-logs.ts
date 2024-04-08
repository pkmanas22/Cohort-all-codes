
// for generating SQL query 

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info','query']   // there exist error & warn
});

async function main() {
    // Write your logic
    const users = await prisma.user.findMany({});
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