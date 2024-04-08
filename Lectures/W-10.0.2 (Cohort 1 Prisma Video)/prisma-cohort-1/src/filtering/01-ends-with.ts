
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    // Write your logic
    const users = await prisma.user.findMany({
        where: {
            email: {
                endsWith: 'yahoo.com'
            },
            posts: {
                // Has atleast one post published
                some: {
                    published: true
                }
            },
        },
        include: {
            posts: {
                where: {
                    published: true,
                },
            },
        },
    })
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