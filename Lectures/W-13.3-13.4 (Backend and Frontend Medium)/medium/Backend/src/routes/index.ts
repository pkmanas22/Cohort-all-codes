import { Hono } from "hono";
import userRouter from "./userRouter";
import blogRouter from "./blogRouter";
import prismaGenerator from "../prisma";

const router = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string,
    }
}>();

router.route('/users', userRouter);

router.route('/posts', blogRouter);

export default router;