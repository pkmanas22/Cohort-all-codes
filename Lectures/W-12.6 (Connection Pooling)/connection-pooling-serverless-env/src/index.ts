import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export interface Env {
	DATABASE_URL: String
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {

		const prisma = new PrismaClient({
			datasourceUrl: env.DATABASE_URL,
		}).$extends(withAccelerate());

		const result = await prisma.user.create({
			data: {
				name: 'manas',
				email: 'manas@gmaic.com',
				password: '12345'
			}
		})
		return Response.json({
			result,
		})
	},
};
