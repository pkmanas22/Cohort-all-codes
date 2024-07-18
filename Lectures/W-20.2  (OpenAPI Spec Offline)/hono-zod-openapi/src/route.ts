import { createRoute } from '@hono/zod-openapi';
import { ParamsSchema, UserSchema } from './schema';

export const userRoute = createRoute({
    method: 'get',
    path: '/user/{id}',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserSchema
                },
            },
            description: "Retrive the user"
        },
    }
})
