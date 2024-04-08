
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info','query']
});

async function main() {
    // Write your logic
    await prisma.user.create({
        data: {
            email: 'manaskp@yahoo.com',
            name: 'Mr. Manas',
            posts: {
                create: {
                    title: 'user & post creation',
                    content:'content',
                }
            }
        }
    })
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