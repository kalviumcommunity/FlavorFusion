const mongoose = require('mongoose')
require('dotenv').config()

const startDatabase = async ()=>{
    try{
       const conn = await mongoose.connect(process.env.Database_URI)
        console.log('Connected to MongoDB ')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
const isConnected = async()=>{
    return (mongoose.connection.readystate === 1);
}
module.exports = {startDatabase,isConnected}