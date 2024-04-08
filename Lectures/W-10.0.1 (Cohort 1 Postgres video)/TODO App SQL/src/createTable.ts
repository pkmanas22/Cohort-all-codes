import getClient from "./utils";

export async function createTable() {
    const createUserQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;

    const client = await getClient();
    
    await client.query(createUserQuery);

    const createTodoQuery = `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            title TEXT NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT FALSE
        )
    `

    await client.query(createTodoQuery);

    console.log("Table created successfully");
}

createTable();