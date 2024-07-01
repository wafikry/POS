const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Database connection pool
const pool = new Pool({
    user: 'pstgres',
    host: 'localhost',
    database: 'POS',
    password: '123456789',
    port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to save food item
app.post('/api/save-food', async (req, res) => {
    const { foodName, foodCategory, foodPrice, foodQuantity } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO food_items (name, category, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [foodName, foodCategory, foodPrice, foodQuantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error saving food item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
