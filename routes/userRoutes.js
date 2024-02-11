const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken package
const { UserModel } = require("../models/userModel");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { email, username, pass } = req.body;

    try {
        bcrypt.hash(pass, 5, async function(err, hash) {
            console.log(hash)
            if (err) {
                res.send("Something went wrong while hashing");
            } else {
                const user = new UserModel({ username, email, pass: hash });
                await user.save();
                res.send("New user has been created");
            }
        });
    } catch (error) {
        res.send("Error in registering user");
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            res.send("User not found");
            return;
        }

        bcrypt.compare(pass, user.pass, function(err, result) {
            if (result) {
                const token = jwt.sign({ userID:user._id, user:user.username }, "masai");
                res.send({ msg: "Login successful", token: token });
            } else {
                res.send("Wrong password");
            }
        });
    } catch (error) {
        res.send({ error: error.message }); // Send error object as a response
    }
});

module.exports = { userRouter };
