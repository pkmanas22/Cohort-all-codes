import getClient from "./utils";

async function deleteTodo(todoId: number){
    const client = await getClient();

    const deleteQuery = `
        DELETE FROM todos WHERE id = $1
    `;
    await client.query(deleteQuery, [todoId]);
    console.log(`Todo with ID ${todoId} deleted!`);
}

async function deleteUser(userId: number){
    const client = await getClient();

    const deleteQuery = `
        DELETE FROM users WHERE id = $1
    `;
    await client.query(deleteQuery, [userId]);
    console.log(`User with ID ${userId} deleted!`);
}


const todoIdToDelete = 2;
deleteTodo(todoIdToDelete);
const userIdToDelete = 5;
deleteUser(userIdToDelete);