import { Hono } from "hono";
import { handleUserSignin, handleUserSignup } from "../controller/userMethod";

const userRouter = new Hono();

userRouter.post('/signup', handleUserSignup);

userRouter.post('/signin', handleUserSignin);

export default userRouter;