const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const FlavourFusion = require("../Model/FlavourFusion.model.js");

require('dotenv').config()
const Joi=require('joi')
const jwt = require('jsonwebtoken')

const schema=Joi.object({
    ID:Joi.string().required(),
    RECIPE:Joi.string().required(),
    INSTRUCTIONS:Joi.string().required(),
    COOKINGTIME:Joi.string().required(),
    NUTRITIONALINFORMATION:Joi.string().required(),
    CREATEDBY:Joi.string().required()
})

const authenticateToken = (req, res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
      if(err) return res.status(403).send(err)
      next()
    })
  }

getRouter.get('/getallflavourfusion',authenticateToken, async (req, res) => {
    try {
        const flavourfusion = await FlavourFusion.find();
        res.status(200).json(flavourfusion);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

getRouter.get('/getflavourfusion/:id',authenticateToken,async (req, res) => {
    try {
        const flavourfusion = await FlavourFusion.findOne({ deviceId: req.params.id });
        if (!flavourfusion) {
            return res.status(404).send({
                message: "Flavour Fusion not found"
            });
        }
        res.status(200).json(flavourfusion);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

postRouter.post('/addflavourfusion',authenticateToken, async (req, res) => {
    const {error, value}=schema.validate(req.body, {abortEarly:false});
    try {
        if(!error){
        const {ID,RECIPE,INSTRUCTIONS,COOKINGTIME,NUTRITIONALINFORMATION,CREATEDBY} = req.body
        const newFlavourFusion = await FlavourFusion.create({ID,RECIPE,INSTRUCTIONS,COOKINGTIME,NUTRITIONALINFORMATION,CREATEDBY});
        res.status(201).json(newFlavourFusion);}
        else{
            return res.status(400).send({
                message: `Bad request, error:${error}`
            })
            console.error(error)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

putRouter.patch('/updateflavourfusion/:id',authenticateToken, async (req, res) => {
    const {error, value}=schema.validate(req.body, {abortEarly: false});
    try {
        if(!error){
        const flavourfusionId = req.params.id;
        const {ID,RECIPE,INSTRUCTIONS,COOKINGTIME,NUTRITIONALINFORMATION,CREATEDBY} = req.body;

        const updatedFlavourFusion = await FlavourFusion.findOneAndUpdate(
            { ID: flavourfusionId },
            { $set: {ID,RECIPE,INSTRUCTIONS,COOKINGTIME,NUTRITIONALINFORMATION,CREATEDBY} },
            { new: true }
        );

        if (!updatedFlavourFusion) {
            return res.status(404).send({
                message: "Flavour Fusion not found"
            });
        }

        res.status(200).json(updatedFlavourFusion);
    }else{
        return res.status(400).send({
            message: `Bad request, error:${error}`
        })
        console.error(error)
    }}catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});


deleteRouter.delete('/deleteFlavourFusion/:id',authenticateToken, async (req, res) => {
    try {
        const flavourfusionId = req.params.id;
        const deleteFlavourFusion = await FlavourFusion.findOneAndDelete({"ID":flavourfusionId});  
        res.status(200).json("deleted FlavourFusion");
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = { getRouter, postRouter, deleteRouter, putRouter };