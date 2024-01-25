const mongoose=require("mongoose")

const authSchema=mongoose.Schema({
    name:{type:"string",require:true},
    age:{type:Number,require:true},
    email:{type:"string",require:true}
})

const AuthModel=mongoose.model("user",authSchema)
module.exports={AuthModel}