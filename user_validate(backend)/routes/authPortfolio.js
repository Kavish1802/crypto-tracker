// const { Axios } = require('axios');
const axios =require('axios')
const express=require('express');
// const { SingleCoin } = require('../../src/Component/gecko/geckoApi');
const fetchUser = require('../middleWare/fetchUser');
const router=express.Router();
const Coin=require('../models/CoinSchema')

router.post('/addCoin',async (req,res)=>{

    console.log('i am here',req.body.id,req.body.user);
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${req.body.id}`);

    if(!data)
    {
        return res.status(400).send({success:false,message:`could not get data ${data}`});
    }

    // const {data}=req.body;
    // console.log(data);

    // console.log(req.user,data.id)

    let already=await Coin.findOne({user:req.body.user,name:data.id});

    console.log("data 1");
    
    if(already)
    {
        return res.send({success:false,message:'already present'});
    }
    try{
        console.log("data 2");
        let coin=new Coin({
            user:req.body.user,name:data.id,
        })
        console.log("data 3");
        let saveCoin=await coin.save();
        console.log("data 4",saveCoin.name,saveCoin.user);
        // console.log(saveCoin.user);
        res.send({success:true,message:saveCoin.name});
    }
    catch(error)
    {
        res.status(400).send({success:false,message:`could not get coin ${data}`});
        // alert('could not add coin');
    }
})

router.delete('/deleteCoin/:id',async (req,res)=>{
    const id=req.body.id;

    // console.log(id);

    try{
        let coin=await Coin.findOne({id:id});
        console.log(id);
        if(!coin)
        {
            res.status(400).send({success:false,message:`cannot find coin ${id}`});
        }
        // console.log(id);

        // coin=await Coin.findByIdAndDelete(id);
        coin=await Coin.findOneAndDelete({id:id});
        res.send({success:true,message:'deleted'});
    }
    catch(error){
        res.status(400).send({success:false,message:'could not find coin'});
    }
})

router.post('/fetchAllCoin',async (req,res)=>{
    try{
        const coin=await Coin.find({user:req.body.user});
        res.send({success:true,message:coin});
    }
    catch(error){
        res.status(400).send({success:false,message:'could not show result'});
    }
})

module.exports=router;