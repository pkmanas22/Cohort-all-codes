import getClient from "./utils";

async function getUsers() {
    const client = await getClient();

    const getUsersQuery = `
        SELECT * FROM users
    `;
    const allUsers = await client.query(getUsersQuery);
    console.log("All User list: ");
    for (let user of allUsers.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

async function getUserFromEmail(email: string) {
    const client = await getClient();

    const selectedUserQuery = `
        SELECT * FROM users WHERE email = $1
    `;
    const userDetails = await client.query(selectedUserQuery, [email]);

    console.log("Single User detail:");
    // console.log(userDetails.rows[0]);
    
    console.log(`ID: ${userDetails.rows[0].id}, Email: ${userDetails.rows[0].email}`);
}

async function getTodosForUser(userId: number) {
    const client = await getClient();

    const todoQuery = `
        SELECT * FROM todos WHERE user_id = $1
    `;
    const result = await client.query(todoQuery, [userId]);

    console.log(`Todos for User ID ${userId}:`);
    for (const todo of result.rows) {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`);
    }
}

getUsers();

getUserFromEmail("john12.do11e1@gmail2.com")

const userIdToFetch = 3;
getTodosForUser(userIdToFetch);