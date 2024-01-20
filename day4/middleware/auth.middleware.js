const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const {token}=req.query
    jwt.verify(token,"shaurya",(err,decode)=>{
        if(decode){
            next()
        }
        else{
            res.status(400).send({"err":err})
        }
    })
}
module.exports={auth}