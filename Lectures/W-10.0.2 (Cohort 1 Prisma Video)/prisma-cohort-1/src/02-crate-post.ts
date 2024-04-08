
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    // Write your logic
    await prisma.post.create({
        data: {
            title: 'New Title',
            content: 'Description of new title',
            author: {
                connect: {
                    id: 1
                }
            },
            // authorId: 1
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