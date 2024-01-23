const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const access_token_key = process.env.access_token_key;
const refresh_token_key = process.env.refresh_token_key;

const auth = (req, res, next) => {
    const access_token = req.cookies["masai_access_token"];
    const refresh_token = req.cookies["masai_refresh_token"]
    const { username, email } = req.body;

    try {
        jwt.verify(access_token, access_token_key, (err, payload) => {
            if (err) {
                if (err.message === "jwt expired") {
                    jwt.verify(refresh_token, refresh_token_key, (err, refreshPayload) => {
                        if (err) {
                            res.status(401).send("Please login again");
                        } else {
                            const new_access_token = jwt.sign({ username, email }, access_token_key, { expiresIn: 60 });
                            res.access_token = new_access_token;
                            console.log("Refresh token is valid");
                            next();
                           
                        }
                    });
                } else {
                    res.status(401).send("Login again");
                }
            } else {
                next();
            }
        });
    } catch (error) {
        return res.status(500).send({ "msg": error });
    }
};

module.exports = { auth };
