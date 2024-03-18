const express = require("express")

const {restaurentModel}=require('../models/restaurent.model')
const {verifyToken} = require("../middleware/middleware")

const restaurentRouter = express.Router()

restaurentRouter.post('/',verifyToken,async(req,res)=>{
      try{
        const {Name,ChainID} = req.body
        const newRestaurent = await restaurentModel({Name,ChainID})
        await newRestaurent.save()
        res.status(200).json({msg:"Restaurent Created Sucessfully",restaurent:newRestaurent})

      }
      catch(err){
        console.log(err)
        res.status(404).json({msg:"Something went wrong to create a new Restaurent"})
      }
})

restaurentRouter.get('/',verifyToken,async(req,res)=>{
    try{
        const getdata = await restaurentModel.find()


        res.status(200).json({msg:"Total Restaurents Are here..",getdata})

    }
    catch(err){
        console.log(err);
        res.status(404).json({msg:"Something went wrong to retriving Restaurents/.."})
    }
})



restaurentRouter.get('/:id',verifyToken,async(req,res)=>{
    try{
        const getdata = await restaurentModel.findById(req.params.id)
        if (!getdata){
            return res.status(400).json({msg:"Restaurent Not Found"})
        }
        res.status(200).json({msg:"Restaurent are assemble!!",getdata})

    }
    catch(err){
        console.log(err)
        res.status(404).json({msg:"Something went wrong to retriving the data from this ID"})
    }
})

restaurentRouter.put("/:id",verifyToken, async (req, res) => {
    try {
      const { Name, ChainID } = req.body;
      const updatedRestaurant = await restaurentModel.findByIdAndUpdate(
        req.params.id,
        { Name, ChainID },
        { new: true }
      );
      if (!updatedRestaurant) {
        return res.status(404).json({ msg: "Restaurant not found" });
      }
      res.status(200).json({ msg: "Restaurant updated successfully", restaurant: updatedRestaurant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to update restaurant" });
    }
  });
  
  restaurentRouter.delete("/:id",verifyToken, async (req, res) => {
    try {
      const deletedRestaurant = await restaurentModel.findByIdAndDelete(req.params.id);
      if (!deletedRestaurant) {
        return res.status(404).json({ msg: "Restaurant not found" });
      }
      res.status(200).json({ msg: "Restaurant deleted successfully",  deletedRestaurant });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to delete restaurant" });
    }
  });





module.exports = {
    restaurentRouter
}