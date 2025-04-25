const express = require('express');
const app = express();
require('dotenv').config();
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const pool = require('./db');

pool.query('SELECT current_database()')
  .then((res) => {
    console.log('Connected to the database:', res.rows[0].current_database);
  })
  .catch((err) => {
    console.error('Error fetching database name:', err);
  });
