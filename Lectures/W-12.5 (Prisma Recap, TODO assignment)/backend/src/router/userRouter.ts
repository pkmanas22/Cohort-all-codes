import { Hono } from 'hono'
import { handleUserSignin, handleUserSignup } from '../controller/userMethod';

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string,
    },
    Variables: {
        user: string
    }
}>();

userRouter.post('/signup', handleUserSignup)

userRouter.post('/login', handleUserSignin)

export default userRouter;