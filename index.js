//npm init -y
//npm install express mysql2 dotenv ejs
//npm install --save-dev nodemon
//npm install bcrypt
const express = require('express');
const path = require('path'); // Path for views
const pool = require('./model/db'); // Import database connection
//const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);





//try
async function testConnection() {
    try {
      const [rows] = await pool.query('SELECT 1 + 1 AS result');
      console.log('Database connection successful:', rows);
    } catch (err) {
      console.error('Database connection failed:', err);
    } finally {
      //process.exit(); // Exit after checking
    }
}
  
testConnection();




const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});