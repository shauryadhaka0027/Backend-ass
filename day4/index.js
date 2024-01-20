const express=require("express")
const app=express()
const dotenv=require("dotenv").config();
const PORT=process.env.PORT;
const {connection}=require("./db")
const {userRouter}=require('./Routes/userRoutes');
const jwt=require("jsonwebtoken")

app.use(express.json())

app.use("/users",userRouter)

app.get("/Home",(req,res)=>{
    res.send("Homepage")
})
app.get("/Products",(req,res)=>{
    const {token}=req.query
    jwt.verify(token,"shaurya",(err,decode)=>{
        if(decode){
            res.status(200).send({"msg":"products......"})
        }
        else{
            res.status(400).send({"err":err})
        }
    })
    
})
app.get("/Posts",(req,res)=>{
    const {token}=req.query
    jwt.verify(token,"shaurya",(err,decode)=>{
        if(decode){
            res.status(200).send({"msg":"Posts......"})
        }
        else{
            res.status(400).send({"err":err})
        }
    })
    
})
app.get("/Todos",(req,res)=>{
    const {token}=req.query
    jwt.verify(token,"shaurya",(err,decode)=>{
        if(decode){
            res.status(200).send({"msg":"Todos......"})
        }
        else{
            res.status(400).send({"err":err})
        }
    })
    
})
app.listen(PORT,async()=>{
    try{
         await connection;
         
        console.log(`server is running http://localhost:${PORT} is mongobd is conncted `)
    }
    catch(error){
        console.log(error)
    }

})