
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({log: ['info','query']});

async function main() {
    // Write your logic

    const users = await prisma.user.findMany({});       // all items
    // const users = await prisma.user.findMany({take: 1});   // this will print only 1 elements as given in take
    console.log("users :");
    console.log(users);

    const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })  // This will generate only id
    console.log("userWithIdOnly : ");
    console.log(userWithIdOnly);

    const uniqueUser = await prisma.user.findUnique({
        where: {
            id: 1,
        },
        include: {      // join the data
            posts: true
        }
    })
    console.log("Unique User: ");
    console.log(uniqueUser);
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