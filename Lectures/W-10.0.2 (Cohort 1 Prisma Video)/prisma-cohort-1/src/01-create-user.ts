
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
    // logic
    await prisma.user.create({
        data: {
            email: 'manas@pkamanas.com',
            name: 'Manas Kumar Pradhan',
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