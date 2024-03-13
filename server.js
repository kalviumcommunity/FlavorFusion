const express=require('express')

const app=express()
app.get('/', (req,res)=>{
    res.json({message:'Hello'})
})

app.get('/ping', (req,res)=>{
    res.json({message:'pong'})
})
app.listen(3000, (req,res)=>{
    console.log('server is running on port 3000')
})
