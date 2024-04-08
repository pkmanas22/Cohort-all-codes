import getClient from "../utils";

// Get all todos for a give user
// This needs to ensure that every user comes atleast once
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, t.title, t.description, t.done FROM users 
        LEFT JOIN todos t 
        ON users.id = t.user_id
        WHERE users.id = $1;
    `;

    const res = await client.query(joinQuery, [userId]);
    const results = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(3)