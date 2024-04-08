// import { Client } from "pg";

// const client = new Client();
import { client } from "..";
/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try {
        // await client.connect()
        const createUserQuery = `
            INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING username, password, name;
        `;
        const userValue = [username, password, name];
        const result = await client.query(createUserQuery, userValue);
        // console.log(result);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating user:", error);
    // } finally {
    //     await client.end();
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try {
        // await client.connect();
        const getQuery = `
            SELECT username, password, name FROM users
            WHERE id = $1;
        `
        const res = await client.query(getQuery, [userId]);
        
        const ans = {
            id: userId,
            username: res.rows[0].username,
            name: res.rows[0].name
        }
        // console.log(ans);
        
        return ans;
    } catch (error) {
        console.error("Error getting user:", error);
    // } finally {
    //     await client.end();
    }
}