import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createTodoSchema, updateTodoSchema } from "../utils/zodSchema";

export async function getAllTodos(c) {
    const user = c.get("user");
    // console.log(user);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: user.id,
            }
        });

        if (todos.length <= 0) {
            return c.json({
                msg: "No Todos available right now"
            })
        }

        return c.json({
            todos
        })
    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}

export async function createTodo(c) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const response = await createTodoSchema.safeParse(body);

    if (!response.success) {
        const errorObj: Record<string, string> = {};
        
        response.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            const value = issue.message;
            errorObj[key] = value;
        });
        
        c.status(400)
        return c.json(errorObj)
    }

    const {
        title,
        description
    } = response.data;

    const user = c.get("user");

    try {
        const todo = await prisma.todo.create({
            data: {
                title,
                description,
                userId: user.id
            }
        })

        return c.json({
            msg: "Todo created succesfully",
            author: `${user.firstName} ${user.lastName}`,
            todo: {
                id: todo.id,
                title: todo.title,
                description: todo.description,
            },
        })

    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}

export async function updateTodo(c) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const todoId = await c.req.param('todoId')

    const response = await updateTodoSchema.safeParse(body);

    if (!response.success) {
        const errorObj: Record<string, string> = {};
        
        response.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            const value = issue.message;
            errorObj[key] = value;
        });
        
        c.status(400)
        return c.json(errorObj)
    }

    const {
        title,
        description,
        done
    } = response.data;

    if (!title && !description) {
        c.status(400);
        return c.json({
            msg: "Nothing to update"
        })
    }

    let todo;
    try {
        todo = await prisma.todo.findUnique({
            where: {
                id: todoId,
            }
        })
    } catch (error) {
        c.status(400);
        return c.json({
            msg: "Todo not found"
        })
    }

    if (!todo) {
        c.status(400);
        return c.json({
            msg: "Todo not found"
        })
    }

    try {
        todo = await prisma.todo.update({
            where: {
                id: todoId
            },
            data: {
                title: title !== undefined ? title : todo?.title,
                description: description !== undefined ? description : todo?.description,
                isCompleted: done ? done : todo.isCompleted,
            }
        })

        return c.json({
            msg: "Todo updateed succesfully",
            todo: {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                completed: todo.isCompleted
            },
        })

    } catch (error) {
        c.status(503);
        return c.json({
            msg: "Internal error occured"
        })
    }
}