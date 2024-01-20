const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{type:String,require:true},
    pass:{type:String,require:true},
    age:{type:String,require:true}
},{
    versionKey:false
})
const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}