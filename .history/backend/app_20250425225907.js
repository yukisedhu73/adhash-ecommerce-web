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

pool.connect()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
