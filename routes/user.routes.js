const express = require("express")

const {userModel}= require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userRouter = express.Router()


userRouter.post('/signup',async(req,res)=>{
    try{
        const {Name,Email,Password,Role}=req.body
        const existingUser = await userModel.findOne({Email})
        if (existingUser){
            return res.status(400).json({msg:"Email are already Registerd"})
        }
          const hasedpassword =await bcrypt.hash(Password,10)
          const newuser = await userModel({
            Name,Email,Password:hasedpassword,Role
          })
          await newuser.save()
          res.status(201).json({msg:"User Signed Up Sucessfully..."})

    }
    catch(err){
        console.log(err)
        res.status(404).json({msg:"Something went wrong to Signup The user..."})
    }
})


userRouter.post('/login',async(req,res)=>{
 try{
    const {Email,Password}=req.body
    const user = await userModel.findOne({Email})
    if (!user){
        return res.status(400).json({msg:"Wrong Credentials"})
    }
    const PasswordMatch = await bcrypt.compare(Password,user.Password)
    if (!PasswordMatch){
        return res.status(400).json({msg:"Invalid Email And Password"})
    }
    //genreating jwt token here

    const token = jwt.sign({userId:user._id},process.env.SecretKey,{
        expiresIn:'1hr'
    })
    res.status(200).json({msg:"Login Sucessfully",token})


 }
 catch(err){
    console.log(err)
    res.status(404).json({msg:"Something went wrong to Login The User"})
 }
})


module.exports = {
    userRouter
}