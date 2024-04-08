// Create a function that let’s you insert data into a table. Make it async, make sure client.connect resolves before u do the insert
import { Client } from "pg";
async function insertData(username: string, email: string, password: string) {
    const client = new Client({
        connectionString: 'postgresql://pkmanas22:eijBGc85MNYR@ep-divine-rice-a5z5qg2g.us-east-2.aws.neon.tech/test?sslmode=require'
    })

    try {
        await client.connect();
        // const insertQuery = "INSERT INTO users (username, email, password) VALUES ('manaskpradhan', 'manas@pkmanas.com', 'manas@123')";     // this is insecure to store data as if user send SQL query such that delete row or delete table then in this format, the data is first inserted and then perform other action which is not what we need. This is called SQL INJECTION as someone can get access/delete the data.
        // so we don't need to put user provided fileds to database
        // const result = await client.query(insertQuery);

        // The secure way is
        // user
        // const insertUserQuery = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
        // const userValues = [username, email, password]
        // const userResult = await client.query(insertUserQuery,userValues);
        // console.log("Insertion success ", userResult);

        // address
        const insertAddressQuery = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
        const addressValues = ['1', 'New York', 'USA', '123 Broadway St', '10001'];
        const addressResult = await client.query(insertAddressQuery, addressValues);
        console.log(addressResult);
    } catch (error) {
        console.error("Error during insertion ", error);
    } finally {
        await client.end();
    }
}

insertData("manas","manas2@pkmmanas.com","1234")