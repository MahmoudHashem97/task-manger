const jwt =require('jsonwebtoken')
const User =require('../models/user')


const auth =async (req,res,next)=>{
    try{
        //use the token to fetch the id then find user by id and verify its token then send
        const token =req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,process.env.JWT_TOKEN)
        const user = await User.findOne({_id : decoded._id,'tokens.token':token})
        if (!user){
            throw new Error()
        }
        req.token =token
        req.user =user //to not fetch again after the auth done 
        next()
    }catch(e){
        res.status(400).send('error in auth')
    }
}

module.exports =auth 