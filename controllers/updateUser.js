const erroraHandler = require("../utils/error")
const bcrypt=require('bcrypt')
const User=require('../models/user.model')
const updateUser=async(req,res,next)=>{
 if(req.user.id!==req.params.id) return next(erroraHandler(401,"You can only update your account"))
 try {
    if(req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password,10)
    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar,
        }
    },{new:true})

    const {password,...rest}=updatedUser._doc;
    res.status(200).json(rest);

 } catch (error) {
    next(error)
 }
}

module.exports=updateUser