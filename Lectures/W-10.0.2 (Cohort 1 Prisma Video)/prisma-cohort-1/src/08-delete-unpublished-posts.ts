
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    // Write your logic
    await prisma.user.update({
        where: {
            id: 4
        },
        data: {
            posts: {
                deleteMany: {
                    published: false
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