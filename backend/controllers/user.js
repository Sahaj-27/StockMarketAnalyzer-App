const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const pool = require('../models/StockApp');

userRouter.get('/', async (request, response) => {
    const client = await pool.connect(); // Acquire a client from the pool
    console.log('connected');

    try {
        const users = await client.query('SELECT * FROM person');
        console.log(users.rows);

        if (users.rows.length > 0) {
            response.json(users.rows); // Sending the data as JSON
        } else {
            response.status(200).json([]); // Send an empty array if no users found
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

userRouter.post('/', async (request, response) => {
    const client = await pool.connect(); // Acquire a client from the pool
    try {
        const { email, name, password } = request.body;
        console.log(email, name, password);
        console.log('hello');
        if (!email || !password || email.length < 3 || password.length < 3 || !name || name.length < 3) {
            return response.status(400).json({ error: 'email, name and password are required and must be at least 3 characters long' });
        }

        const result = await client.query('SELECT * FROM person WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return response.status(201).json('email must be unique');
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUsers = await client.query('INSERT INTO person (email, name, password) VALUES ($1, $2, $3) RETURNING *', [email, name, passwordHash]);
        const savedUser = newUsers.rows[0];
        response.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

module.exports = userRouter;