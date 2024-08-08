// import { Client } from 'pg';
// import { PostgresConfig } from './config';

// const client = new Client({
//   connectionString: PostgresConfig.ConnectionString,
// });

// (async function () {
//   await client.connect();
// })();

// // Create a fn which create table users
// async function createUsersTable() {
//   await client.connect();
//   const result = await client.query(`
//     CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) UNIQUE NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
// );
// `);
//   console.log(result);
// }

// // Create a fn which insert data into users
// async function insertUsersTable() {
//   // To avoid sql injection
//   const query =
//     'INSERT INTO users(username, email, password) VALUES($1, $2, $3);';
//   const values = ['durgesh18', 'durgesh@gmail.com', '12345678'];
//   const result = await client.query(query, values);
//   console.log(result);
// }

// // Create a fn to find all users
// async function getAllUsers() {
//   const result = await client.query('SELECT * FROM users');
//   console.log(result);
// }

// // Create a fn to find particular user
// async function getSelectedUser(username: string) {
//   const query = 'SELECT * FROM users WHERE username = $1';
//   const result = await client.query(query, [username]);
//   console.log(result.rows);
// }

// // createUsersTable();
// // insertUsersTable();
// // getAllUsers();
// getSelectedUser('dragon18');

// // Relations & Table
// // We use foreign key in another table to refer to particular table to get data

// Now we are using prisma as orm to understand crud in postgres
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
