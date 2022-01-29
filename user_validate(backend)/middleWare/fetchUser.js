const jwt=require('jsonwebtoken');
var JWT_SECRET='adding@wow';

const fetchUser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token)
    {
        return res.status(400).send({success:false,message:'wrong validation'});
    }

    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    }
    catch(error)
    {
        res.status(400).send({success:false,message:'failed authentication'});
    }
}

module.exports=fetchUser;