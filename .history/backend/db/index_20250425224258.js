// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// module.exports = pool;

const express = require('express');
const pool = require('./db'); // your db.js
require('dotenv').config();

const app = express();
app.use(express.json());

//DB Connection Check
pool.query('SELECT NOW()')
  .then(res => {
    console.log('Connected to PostgreSQL at', res.rows[0].now);
  })
  .catch(err => {
    console.error('Failed to connect to PostgreSQL:', err.message);
    process.exit(1); // Stop the app if DB is not connected
  });

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
