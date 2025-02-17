const express = require("express");
const pool = require('../model/db'); // Import the database connection
const user = express.Router();
const usercontrol = require('../controller/user');



//user
user.get('/', (req, res)=>{
    res.send('dataaaa');
})

user.get('/create', (req, res)=>{
    res.render('create_account');
})

user.get('/login', (req, res)=>{
    res.render('login');
})

user.post('/create', (usercontrol.addUser));

module.exports = user;