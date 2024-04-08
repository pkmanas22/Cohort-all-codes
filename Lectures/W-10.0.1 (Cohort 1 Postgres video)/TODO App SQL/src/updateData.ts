import getClient from "./utils";

async function updateTodo(todoId: number) {
    const client = await getClient();

    const updateQuery = `
        UPDATE todos SET done = true WHERE user_id = $1
    `;
    
    await client.query(updateQuery, [todoId]);
    console.log(`Todo with ID ${todoId} updated to done!`);
}

const todoIdToUpdate = 5;
updateTodo(todoIdToUpdate);