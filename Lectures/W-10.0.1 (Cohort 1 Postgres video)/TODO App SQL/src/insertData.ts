import getClient from "./utils";

export async function insertData() {
    const client = await getClient();

    const insertUserQuery = `
        INSERT INTO users (email, password) VALUES ($1,$2) RETURNING id
    `;
    const userValues = ['john21.do11e1@gmail2.com', 'hashed_password_here'];

    const res = await client.query(insertUserQuery, userValues);

    // console.log(res);
    
    const insertTodosQuery = `
        INSERT INTO todos (user_id, title, description, done) VALUES ($1, $2, $3, $4) RETURNING id
    `
    const todosValue = [res.rows[0].id, "Go to Gym", "Workout plan", false];

    await client.query(insertTodosQuery, todosValue);

    console.log("Entries created!");
}

insertData();