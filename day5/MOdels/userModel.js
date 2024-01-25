const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{type:"string",require:true},
    email:{type:"string",require:true},
    pass:{type:"string",require:true},
    age:{type:"string",require:true}
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}