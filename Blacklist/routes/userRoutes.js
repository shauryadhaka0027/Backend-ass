const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { UserModel } = require("../model/userModel");
const access_token_key = process.env.access_token_key;
const refresh_token_key = process.env.refresh_token_key;

authRouter.post("/signup", async (req, res) => {
    const { email, username, pass, age } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({"msg": err});
            } else {
                const data = new UserModel({ email, pass: hash, username, age });
                await data.save();
                res.status(200).send("User is created");
            }
        });
    } catch (error) {
        res.status(400).send({"msg": error});
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;

    try {
        const data = await UserModel.findOne({ email });
        if (data) {
            bcrypt.compare(pass, data.pass, (err, result) => {
                if (err) {
                    res.status(400).send({"msg": err});
                } else {
                    const access_token = jwt.sign({ email: data.email, username: data.username }, access_token_key, { expiresIn: "60s" });
                    const refresh_token = jwt.sign({ email: data.email, username: data.username }, refresh_token_key, { expiresIn: "120s" });

    
                    res.cookie("masai_access_token", access_token);
                    res.cookie("masai_refresh_token", refresh_token);

            
                    res.status(200).send({"msg": "Login successful"});
                }
            });
        }
    } catch (error) {
        res.status(500).send({"msg": error});
    }
});

module.exports = { authRouter };
