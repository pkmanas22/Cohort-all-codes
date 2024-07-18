import { z } from '@hono/zod-openapi';

export const ParamsSchema = z.object({
    id: z.string().min(3).openapi({
        param: {
            name: 'id',
            in: 'path',  // user/{id}
        },
        example: '12123'
    }),
})

export const UserSchema = z.object({
    id: z.string().openapi({
        example: '123',
    }),
    name: z.string().openapi({
        example: 'John Doe',
    }),
    age: z.number().openapi({
        example: 30,
    }),
}).openapi('User')      // schema name - User