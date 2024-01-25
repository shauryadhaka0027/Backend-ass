const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../Models/userModel"); // Fix the typo in "Models"
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

userRouter.post("/register", async (req, res) => {
    const { username, email, pass, age } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(500).send({ "msg": err });
            } else {
                const data = new UserModel({ username, email, pass: hash, age });
                await data.save();
                res.status(200).send({ "msg": "user is registered" });
            }
        });
    } catch (error) {
        res.status(400).send({ "msg": "firstly register yourself" });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email }); // Use findOne instead of find

        if (user) {
            bcrypt.compare(pass, user.pass, function (err, result) {
                if (result) {
                    const token = jwt.sign({ username: user.username, email: user.email }, "dhaka");
                    res.status(200).send({ "msg": "user is logged in", "token": token });
                } else {
                    res.status(401).send({ "msg": "Invalid credentials" }); // Use a 401 status code for unauthorized access
                }
            });
        } else {
            res.status(404).send({ "msg": "User not found" }); // Use a 404 status code if the user is not found
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal server error" }); // Use a 500 status code for server errors
    }
});

module.exports = {
    userRouter
};
