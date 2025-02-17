const pool = require('./db');

exports.createUser = async (name, email, password) => {
    await pool.query('INSERT INTO user (user_name, user_email, user_password) VALUES (?, ?, ?)', [name, email, password]);
};

exports.selectuser = async (email) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE user_email = ?', [email]);
        return rows; // Ensure the function returns the fetched data
    } catch (error) {
        console.error('Database error:', error);
        throw error; // Rethrow error so it can be caught in `addUser`
    }
};

exports.loginmethod = async (email, password) => {
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE user_email = ? AND user_password = ?', [email, password]);
        return rows; // Ensure the function returns the fetched data
    } catch (error) {
        console.error('Database error:', error);
        throw error; // Rethrow error so it can be caught in `addUser`
    }
};