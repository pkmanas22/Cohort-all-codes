import { Hono } from 'hono'
import { createTodo, getAllTodos, updateTodo } from '../controller/todoMethod';
import authMiddleware from '../utils/middleware';

const todoRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        SECRET: string,
    },
    Variables: {
        user: string
    }
}>();

todoRouter.use('/*', authMiddleware);

todoRouter.get('/', getAllTodos);

todoRouter.post('/', createTodo);

todoRouter.patch('/:todoId', updateTodo);

export default todoRouter;