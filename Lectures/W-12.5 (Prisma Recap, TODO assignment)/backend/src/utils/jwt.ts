import { sign, verify } from "hono/jwt";

export const createToken = async (
    id: string,
    secretKey: string
) => {

    const token = await sign(id, secretKey);
    // console.log(token);
    return token;    
}

export const verifyToken = async(
    token: string,
    secretKey: string
) => {

    const userId = await verify(token, secretKey)
    return userId;    
}