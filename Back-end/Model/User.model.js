const mongoose=require("mongoose")
const Schema=mongoose.schema

const userInfo=mongoose.Schema({
    name:{type:String,required:true,unique : true},
    password:{type:String,required:true}
},{
    timestamps:true
});

const Model=mongoose.model("User", userInfo)

module.exports=Model