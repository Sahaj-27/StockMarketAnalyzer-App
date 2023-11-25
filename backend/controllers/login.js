const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();
const pool = require('../models/StockApp'); // Assuming StockApp exports a pool

const config = require('../config');
const jwt_secret = config.SECRET;

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body;
    const client = await pool.connect(); // Acquire a client from the pool
    try {
        const result = await client.query('SELECT * FROM person WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // Create a JWT token
                const token = jwt.sign({ id: user.id, email: user.email }, jwt_secret, { expiresIn: '1h' });

                // Send the token as a response 
                res.status(200).json({ token, message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        client.release(); // Release the client back to the pool
    }
});

module.exports = loginRouter;
