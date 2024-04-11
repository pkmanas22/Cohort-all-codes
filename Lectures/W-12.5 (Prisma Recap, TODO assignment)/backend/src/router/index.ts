import { Hono } from 'hono'
import userRouter from './userRouter';
import todoRouter from './todoRouter';

const router = new Hono();

router
    .route('/user', userRouter)
    .route('/todo', todoRouter);

export default router;