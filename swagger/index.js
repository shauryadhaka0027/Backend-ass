const express=require('express')
const { connection } = require('./db')
const app=express()


app.listen(PORT,async()=>{
    try {
        await connection
        console.log("server is running and db also connected")
    } catch (error) {
        
    }
})