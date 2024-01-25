const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const { connection } = require("./db");
const { authRouter } = require("./routes/userRoutes");
const { auth } = require('./middle ware/auth.middleware');
const cookieParser = require("cookie-parser");
const {blackList}=require("./blacklist")

app.use(cookieParser());
app.use(express.json());


app.use("/users", authRouter);


app.get("/series", auth, (req, res) => {
    res.send("series.....");
});
app.get("/logout",async(req,res)=>{
    const access_token = req.cookies["masai_access_token"];
    try {
        blackList.push(token)
        res.send({"msg":"user is logout"})
    } catch (error) {
        res.send({"msg":error})
    }
})

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Server is connected, and the database is also connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
});
