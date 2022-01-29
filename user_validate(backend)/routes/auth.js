const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User')
var bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
var JWT_SECRET='adding@wow';
const fetchUsers=require('../middleWare/fetchUser')

router.get('/', (req, res) => {
    try {
        console.log(req.body);
        const user = User(req.body);
        // user.save()
        res.send(req.body);
    }
    catch (error) {
        res.send(error);
    }
})

router.post('/signUp',
    [
        body('name','ensure minimum 2 characters').isLength({min:2}),
        body('email','enter valid email id').isEmail(),
        body('password','ensure minimum 5 characters').isLength({min:5}),
    ],
    async (req, res) => {

        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.send({success:false,message:errors.array()})
        }

        try {
                let user=await User.findOne({email:req.body.email});
                if(user)
                {
                    return res.status(400).send({success:false,message:'a user with this email already exists'});
                }


                var salt=bcrypt.genSaltSync(10);
                var hash=bcrypt.hashSync(req.body.password,salt);

                user=await User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:hash
                });

                const data={
                    user:{
                        id:user.id
                    }
                }

                const jwtData=jwt.sign(data,JWT_SECRET);
                res.send({success:true,message:jwtData});
        }
        catch(error)
        {
            res.status(400).send({success:false,message:'internal error'});
        }
})

router.post('/login',
    [
        body('email','enter a valid email id').isEmail(),
        body('password','ensure minimum 5 characters').isLength({min:5})
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).send({success:false,message:errors.array()});
        }

        
        try{
            const user=await User.findOne({email:req.body.email});
            if(!user)
            {
                return res.status(400).send({success:false,message:'no user with this email found'});
            }

            console.log(req.body.password,user);

            let val=bcrypt.compare(req.body.password,user.password);
            if(!val)
            {
                return res.status(400).send({success:false,message:'incorrect password'});
            }

            let data={
                user:{
                    id:user.id
                }
            }

            let jwtData=jwt.sign(data,JWT_SECRET);

            res.send({success:true,message:jwtData,user:user});
        }
        catch(error)
        {
            res.status(400).send({success:false,message:'failed validation'})
        }
    })

router.post('/getUser',
    fetchUsers,
    async (req,res)=>{
        try{
            let userId=req.user.id;
            const user=await User.findOne(userId).select("-password");
            res.send(user);
        }
        catch(error)
        {
            res.status(400).send({success:false,message:'cannot find user'})
        }
    })

module.exports = router;