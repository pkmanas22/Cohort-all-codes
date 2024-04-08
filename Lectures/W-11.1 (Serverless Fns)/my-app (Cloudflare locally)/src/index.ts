
export interface Env {

}

// export default {
// 	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
// 		// return new Response('Hello World!');
// 		return Response.json({
// 			msg: 'hi there'
// 		})
// 	},
// };
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// console.log(request.body);
		// console.log(request.headers);
		// console.log(request.method);
		const uri = request.url.replace(/^https:\/\/.*?\//, "/")
		console.log("uri:  " + uri);


		if (request.method === "GET") {
			if (uri == '/users') {
				return Response.json({
					message: "/users request"
				});
			}
			return Response.json({
				message: "you sent a get request"
			});
		} else {
			return Response.json({
				message: "you did not send a get request"
			});
		}
	},
};