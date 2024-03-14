
require("dotenv").config();
const bodyParser=require('body-parser')
const express =require("express")
const app=express()
const mongoose=require("mongoose")

const {startDatabase,isConnected}=require('./dbCon.js')

const { getRouter, postRouter, deleteRouter, putRouter }=require("./routes/FlavourFusion.routes.js");
app.use(bodyParser.json())
app.use(express.json())
app.use("/",getRouter)
app.use("/",postRouter)
app.use("/",deleteRouter)
app.use("/",putRouter)


app.get('/ping', (req,res) =>{
    res.send('Hello')
})
app.get('/home', (req,res) =>{
    res.json({
        message:isConnected()?"Database is connected":"Database is disconnected"
    })
})
  
app.listen(3000, async()=>{
    await startDatabase();
    console.log('Server is running on port 3000')
});

