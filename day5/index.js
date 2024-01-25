const express =require("express")
const { connection } = require("./db")
const {userRouter}=require("./Routes/userRoutes")
const app=express()
const dotenv=require("dotenv").config()
const PORT=process.env.PORT;
const jwt=require('jsonwebtoken')
app.use(express.json())
app.use("/users",userRouter)


app.get("/movies",(req,res)=>{
    let{token}=req.query;

   jwt.verify(token,"shaurya",(err,decode)=>{
    if(decode){
        res.status(200).send({"msg":"movies ......"})
    }
    else{
        res.status(400).send({"token os not vaild":err})
    }
   })
    

})


app.listen(PORT,async()=>{
    try {
     await connection  
   console.log(`express server is running ${PORT} and bd is connected`)
    } catch (error) {
        
    }
})