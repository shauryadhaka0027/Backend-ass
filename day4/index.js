const express = require("express")
const app = express()
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const { connection } = require("./db")
const { userRouter } = require('./Routes/userRoutes');
const jwt = require("jsonwebtoken")
const {auth}=require("./middleware/auth.middleware")

app.use(express.json())

app.use("/users", userRouter)

app.get("/", (req, res) => {
    res.send("Homepage")
})
app.get("/Products",auth, (req, res) => {
    res.status(200).send({ "msg": "products......" })


})
app.get("/Posts",auth, (req, res) => {

    res.status(200).send({ "msg": "Posts......" })

})
app.get("/Todos",auth, (req, res) => {

    res.status(200).send({ "msg": "Todos......" })


})
app.listen(PORT, async () => {
    try {
        await connection;

        console.log(`server is running http://localhost:${PORT} is mongobd is conncted `)
    }
    catch (error) {
        console.log(error)
    }

})