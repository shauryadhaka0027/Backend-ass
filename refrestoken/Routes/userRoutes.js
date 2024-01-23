const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../Module/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const access_token_key = process.env.access_token_key;
const refresh_token_key = process.env.refresh_token_key;
const cookieParser = require("cookie-parser");

userRouter.post("/register", async (req, res) => {
    const { username, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(500).send({ "msg": "Internal Server Error" });
            } else {
                const data = new UserModel({ username, email, pass: hash });
                await data.save();
                res.status(200).send({ "msg": "User is created" });
            }
        });
    } catch (err) {
        res.status(400).send({ "msg": err });
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    const access_token = jwt.sign(
                        { username: user.username, email: user.email },
                        access_token_key,
                        { expiresIn: "1h" }
                    );
                    const refresh_token = jwt.sign(
                        { username: user.username, email: user.email },
                        refresh_token_key,
                        { expiresIn: "7days" }
                    );
                    res.cookie("masai_access_token",access_token);
                    res.cookie("masai_refresh_token",refresh_token)
                    res.status(200).send({ "msg": access_token, refresh_token });
                } else {
                    res.status(401).send({ "msg": "Invalid credentials" });
                }
            });
        } else {
            res.status(404).send({ "msg": "User not found" });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Internal Server Error" });
    }
});

module.exports = {
    userRouter,
};
