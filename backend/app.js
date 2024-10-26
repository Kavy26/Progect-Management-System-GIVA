const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        const transformedData = result.rows.map(row => [
            row.id,
            row.name,
            row.description,
            row.price,
            row.quantity
        ]);
        res.status(200).json(transformedData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving products');
    }
});

app.get('/getProductDetails', async (req, res) => {
    const productId = req.query.id;
    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
        if (result.rows.length === 0) {
            return res.status(404).send('Product not found');
        }
        const product = result.rows[0];
        const transformedProduct = [
            product.id,
            product.name,
            product.description,
            product.price,
            product.quantity
        ];
        res.status(200).json(transformedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving product details');
    }
});

app.post('/add', async (req, res) => {
    const { name, description, price, quantity } = req.body;
    try {
        await pool.query(
            'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4)',
            [name, description, price, quantity]
        );
        res.status(200).send('PRODUCT ADDED');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding product');
    }
});

app.put('/edit', async (req, res) => {
    const { id, name, description, price, quantity } = req.body;
    try {
        await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5',
            [name, description, price, quantity, id]
        );
        res.status(201).send('PRODUCT EDITED');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error editing product');
    }
});

app.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.status(204).send('PRODUCT DELETED');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting product');
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
