const usermodel = require('../model/user'); //model
const bcrypt = require('bcrypt'); //for hashing
const nodemailer = require("nodemailer"); //for email

class usercontrol {
    static async addUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const emailmatch = await usermodel.selectuser(email);
            if(emailmatch.length > 0){
                return res.status(500).send('USER ALREADY EXIST');
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await usermodel.createUser(name, email, hashedPassword);
                //handle random code
                //handle send email
                await usercontrol.sendverification(email);
                res.redirect('/user');
            }
        } catch (err) {
            return res.status(500).send('Error adding user');
        }
    }

    static async sendverification(email) {
        try {
            // Create a transporter using your email service
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "gtristan543@gmail.com",  // Replace with your email
                    pass: "beyd fvmz dhdl xkcb"   // Replace with your email password or App Password
                }
            });
    
            // Email details
            const mailOptions = {
                from: "gtristan543@gmail.com",
                to: email,  // Replace with recipient email
                subject: "Hello from Node.js!",
                text: "This is a test email sent using Nodemailer in Node.js."
            };
    
            // Wrap the sendMail call in a promise
            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error sending email:", error);
                        reject(error);
                    } else {
                        console.log("Email sent:", info.response);
                        resolve(info);
                    }
                });
            });
        } catch (err) {
            console.error("Error in sendverification:", err);
            throw err; // Re-throw the error to be caught by the caller
        }
    }



    static async selectoneuser(req, res) {

    }

    static async loginuser(req, res) {
        try {
            const { email, password } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);
                const value = await usermodel.selectuser(email);
                if(value.length > 0){
                    const match = await bcrypt.compare(password, value.user_password);
                    if(match){
                        //code for SESSION
                    } else {
                        return res.status(500).send('WRONG PASSWORD');
                    }
                } else {
                    return res.status(500).send('No User');
                }
        } catch (err) {
            return res.status(500).send('Error login user');
        }
    }
}

module.exports = usercontrol;