const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    Name : {type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    Role :{type:String,enum:["staff","manager"],required:true},
    createdAt :{type:Date,default:Date.now}

})

const userModel = mongoose.model('user',userSchema)


module.exports = {
    userModel
}