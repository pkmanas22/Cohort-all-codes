import { Hono } from "hono";
import { handleUserSignin, handleUserSignup } from "../controller/usersMethods";

const userRouter = new Hono();

userRouter
    .post('/signup', handleUserSignup)
    .post('/signin', handleUserSignin)

export default userRouter;