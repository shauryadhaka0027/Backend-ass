const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRoutes");
const { auth } = require("./middleware/auth.middleware");
const cookieParser = require("cookie-parser"); 

app.use(express.json());
app.use(cookieParser()); 
app.use("/users", userRouter);

app.get("/blogs", auth, (req, res) => {
  let ass = [{
    title: "masai",
    id: "1"
  }];
  res.send(ass);
});
app.get("/post",auth,(req,res)=>{
    res.send("post.......")
})
app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running port ${PORT} and db is connected`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
