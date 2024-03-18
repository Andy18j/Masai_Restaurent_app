const mongoose = require("mongoose")



const RestaurentSchema = mongoose.Schema({
    Name: { type: String, required: true },
    ChainID: { type: mongoose.Schema.Types.ObjectId ,required:true,unique:true },

})

const restaurentModel = mongoose.model("Restaurent",RestaurentSchema)


module.exports = {
    restaurentModel
}