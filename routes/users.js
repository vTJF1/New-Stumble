const express = require('express');
const router = express.Router();
const User = require('../models/User');

//routes dor user signup
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        //checl if a user with the same email exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            //if so send error
            return res.status(400).send('Email already in use.');
        }
         //create a new user with the given details
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.redirect(`/redirect.html?name=${encodeURIComponent(newUser.name)}`);
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).send('Something went wrong.');
    }
});

//route for logins
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    //gets the email and password from req body
    try {
        //try dfind users with gieven email
        const user = await User.findOne({ email });

        if (!user) {//if user not found return error
            return res.status(400).send('No account found with that email.');
        }

        if (user.password !== password) {
            return res.status(401).send('Incorrect password.');
        }

        // If login is successful
        res.redirect(`/redirect.html?name=${encodeURIComponent(user.name)}`);
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).send('Something went wrong.');
    }
});

module.exports = router;
