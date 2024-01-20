const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../Models/userModel")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async(req,res)=>{
 try {
    const user= new UserModel(req.body)
    await user.save()
    res.status(200).send({"msg":"new user is creates"})
 } catch (error) {
    res.status(400).send({'msg':error})
 }
  
})
userRouter.post("/login", async (req, res) => {
    const { username, pass } = req.body;
    try {
        const user = await UserModel.find({ username, pass });
        if (user) {
            const token = jwt.sign({ username, pass }, "shaurya",{expiresIn:3600});
            res.status(200).send({"token": token, "msg": "login"});
        } else {
            res.status(200).send({"msg": "firstly register and wrong credentials"});
        }
    } catch (error) {
        res.status(400).send({'msg': error});
    }
});


 module.exports={
    userRouter
 }