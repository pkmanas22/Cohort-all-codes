// Write a function getUser that lets you fetch data from the database given a email as input.
import { Client } from 'pg'

async function getUser(email: string) {
    const client = new Client({
        connectionString: "postgresql://pkmanas22:eijBGc85MNYR@ep-divine-rice-a5z5qg2g.us-east-2.aws.neon.tech/test?sslmode=require"
    })
    try {
        await client.connect();
        const searchQuery = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const res = await client.query(searchQuery, values);

        // console.log(res.rows.length);
        // console.log(res.rowCount);       // it can't be used as it may be null
        if (res.rows.length > 0) {
            console.log('User found:', res.rows[0]); // Output user data
            // return res.rows[0]; // Return the user data
        } else {
            console.log('No user found with the given email.');
            // return null; // Return null if no user was found
        }

        const finalSearchQuery = "SELECT city, country, street, pincode FROM addresses WHERE user_id = 1"
        const result = await client.query(finalSearchQuery);
        console.log('Address found:', result.rows[0]);
    } catch (err) {
        console.error('Error during fetching user:', err);
        throw err; // Rethrow or handle error appropriately
    } finally {
        await client.end(); // Close the client connection
    }
}

getUser("manas2@pkmmanas.com").catch(console.error)
