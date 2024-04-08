### 1. Initialise an empty typescript project

```
npm init -y
npx tsc --init
```

### 2. Change the rootDir and outDir in tsconfig.json

```
"rootDir": "./src",
"outDir": "./dist",
```

### 3. Install the pg library and it’s types (because we’re using TS)

```
npm install pg
npm install @types/pg
```

## Connecting...

- Import `Client` from `pg`
- then connect with Postgress
- `new Client()` and assign to `client`
  - In this we can use `connectionString` and give the postgress url as a value in it
  - Or give `host`, `port`, `database`, `user`, `password` and then give as key value pair
- After that connect by using `connect()` . Give this as `await ` as it takes time to connect

## Querying...

- After connecting give query statments by `client.query()` and give SQL query in this.

### Create

```
CREATE TABLE [ IF NOT EXISTS ] table_name ( [
  { column_name data_type }
] )
```

### Insert

```
INSERT INTO table_name [ AS alias ] [ ( column_name [, ...] ) ]
```

### Select

```
SELECT * FROM users WHERE email = 'user@gmail.com'
```

### Relationship

- Relationship is used to store data in different tables and relate it with each other.
- SQL can not store objects like in mongoDB , so we need to create two different tables and link with each other

```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
 );

 CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

Here the main thing is that

```
FOREIGN KEY [(foreign key)] REFERENCES [another table][(primary key of another table)] ON DELETE CASCADE
```

## Close the connection

- Close the client connection by `client.end()`

# Transactions

- Good question to have at this point is what queries are run when the user signs up and sends both their information and their address in a single request.
- Do we send two SQL queries into the database? What if one of the queries (address query for example) fails?
- This would require `transactions` in SQL to ensure either both the user information and address goes in, or neither does

```
BEGIN; --> Start transaction

INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john_doe1@example.com', 'securepassword123');

INSERT INTO addresses (user_id, city, country, street, pincode)
VALUES (currval('users_id_seq'), 'New York', 'USA', '123 Broadway St', '10001');

COMMIT;     --> End transaction
```

```
await client.query('BEGIN');      // Start transaction
await client.query('COMMIT');     // Commit transaction
await client.query('ROLLBACK');   // Roll back the transaction on error
```

# Joins

- Join is used to combine two or more table together
- Fetch a users details and their address

```
(Bad Approach)

-- Query 1: Fetch user's details
SELECT id, username, email
FROM users
WHERE id = YOUR_USER_ID;

-- Query 2: Fetch user's address
SELECT city, country, street, pincode
FROM addresses
WHERE user_id = YOUR_USER_ID;
```

```
(Using Join)

SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
JOIN addresses ON users.id = addresses.user_id
WHERE users.id = '1';

(alias)

SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
FROM users u
JOIN addresses a ON u.id = a.user_id
WHERE u.id = YOUR_USER_ID;
```

## Benefits of using a join -

1. Reduced Latency
2. Simplified Application Logic
3. Transactional Integrity

## Types of Joins
## 1. INNER JOIN
- Returns rows when there is at least one match in both tables.
```
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
INNER JOIN addresses ON users.id = addresses.user_id;
```
## 2. LEFT JOIN
- Returns all rows from the left table, and the matched rows from the right table.
```
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id;
```
## 3. RIGHT JOIN
- Returns all rows from the right table, and the matched rows from the left table.
```
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
RIGHT JOIN addresses ON users.id = addresses.user_id;
```
## 4. FULL JOIN
- Returns rows when there is a match in one of the tables.
- LEFT JOIN + RIGHT JOIN.
```
SELECT users.username, addresses.city, addresses.country, addresses.street, addresses.pincode
FROM users
FULL JOIN addresses ON users.id = addresses.user_id;
```