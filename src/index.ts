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
const { user, todo } = new PrismaClient();

interface User {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

// Create user
async function createUser({ firstName, lastName, email, password }: User) {
  const res = await user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
    select: {
      id: true,
    },
  });

  console.log(res);
}

// createUser({
//   firstName: 'Durgesh',
//   email: 'durgesh@amazon.com',
//   password: '12345678',
// });

// Update User
async function updateUser(lastName: string, email: string) {
  const res = await user.update({
    data: {
      lastName,
    },
    where: {
      email,
    },
  });
  console.log(res);
}

// updateUser('Dubey', 'durgesh@google.com');

// Read Users
async function getUsers() {
  const res = await user.findMany({});
  console.log(res);
}

async function getSelectedUser(email: string) {
  const res = await user.findMany({
    where: {
      email,
    },
  });
  console.log(res);
}

// getUsers();
// getSelectedUser('durgesh@google.com');

// Delete User
async function deleteUser(email: string) {
  const res = await user.delete({
    where: {
      email,
    },
  });
  console.log(res);
}
// deleteUser('durgesh@amazon.com');

async function getTodo(userId: number) {
  const todos = await todo.findMany({
    where: {
      userId,
    },
  });
  console.log('Todo List: ', todos);
}
// getTodo(1);

async function getTodoAndUserDetails(userId: number) {
  const data = await todo.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      completeStatus: true,
      user: true,
    },
  });
  console.log(data);
}

getTodoAndUserDetails(1);

interface Todo {
  title: string;
  description: string;
  userId: number;
}

async function addTodo({ title, description, userId }: Todo) {
  const res = await todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  console.log(res);
}
// addTodo({
//   title: 'Buy Paneer',
//   description: 'Buy Paneer from the store',
//   userId: 1,
// });
