
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";


export default function prismaGenerator(datasourceUrl: string){

    return new PrismaClient({
        datasourceUrl,
    }).$extends(withAccelerate());
};