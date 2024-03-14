const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const FlavourFusion = require("../Model/User.model.js");

require('dotenv').config()
const Joi=require('joi')
const schema=Joi.object({
    ID:Joi.string().required(),
    RECIPE:Joi.string().required(),
    INSTRUCTIONS:Joi.string().required(),
    COOKINGTIME:Joi.string().required(),
    SONNUTRITIONALINFORMATION:Joi.string().required(),
    CREATEDBY:Joi.string().required()
})

getRouter.get('/getallflavourfusion', async (req, res) => {
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

getRouter.get('/getflavourfusion/:id',async (req, res) => {
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

postRouter.post('/addflavourfusion', async (req, res) => {
    const {error, value}=schema.validate(req.body, {abortEarly:false});
    try {
        if(!error){
        const {ID,RECIPE,INSTRUCTIONS,COOKINGTIME,SONNUTRITIONALINFORMATION,CREATEDBY} = req.body
        const newFlavourFusion = await FlavourFusion.create({ID,RECIPE,INSTRUCTIONS,COOKINGTIME,SONNUTRITIONALINFORMATION,CREATEDBY});
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

putRouter.patch('/updateflavourfusion/:id', async (req, res) => {
    const {error, value}=schema.validate(req.body, {abortEarly: false});
    try {
        if(!error){
        const flavourfusionId = req.params.id;
        const {ID,RECIPE,INSTRUCTIONS,COOKINGTIME,SONNUTRITIONALINFORMATION,CREATEDBY} = req.body;

        const updatedFlavourFusion = await FlavourFusion.findOneAndUpdate(
            { ID: flavourfusionId },
            { $set: {ID,RECIPE,INSTRUCTIONS,COOKINGTIME,SONNUTRITIONALINFORMATION,CREATEDBY} },
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


deleteRouter.delete('/deleteFlavourFusion/:id', async (req, res) => {
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