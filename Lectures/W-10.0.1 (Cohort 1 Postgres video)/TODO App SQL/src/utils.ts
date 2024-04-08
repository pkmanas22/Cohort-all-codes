import { Client } from "pg";

export default async function getClient() {
    const client = new Client({
        // connectionString: 'postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable',
        host: 'localhost',
        port:5432,
        database: 'postgres',
        user: 'postgres',
        password:'mysecretpassword'
    })
    await client.connect();
    return client;
}