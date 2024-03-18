const express = require("express")
const jwt  = require("jsonwebtoken")


const verifyToken = (req,res,next) => {
  const token = req.header('authorization')
  if (!token){
    return res.status(404).json({msg:"Unauthorized Please Login again"})
  }
  try{
    const decoded = jwt.verify(token,process.env.SecretKey)
    req.userId = decoded.userId
    next()
  }
  catch(err){
    console.log(err)
    res.status(404).json({msg:"Error to verifying Token.."})
  }
}


module.exports = {
    verifyToken
}