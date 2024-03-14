const mongoose=require("mongoose")
const Schema=mongoose.schema

const userInfo=mongoose.Schema({
    ID:{type:String},
    RECIPE:{type:String},
    INSTRUCTIONS:{type:String},
    COOKINGTIME:{type:String},
    NUTRITIONALINFORMATION:{type:String},
    CREATEDBY:{type:String},
},{
    timestamps:true
});

const Model=mongoose.model("FlavourFusion", userInfo)

module.exports=Model