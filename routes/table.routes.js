const express = require("express");
const { tableModel } = require("../models/table.model");
const { get } = require("http");

const tableRouter = express.Router();

// Route for booking a table
tableRouter.post("/", async (req, res) => {
    try {
        const { RestaurantID, TableNumber,Status } = req.body;
        const newTable = await tableModel.create({
            RestaurantID,
            TableNumber,Status
           
        });
        res.status(200).json({ msg: "Table booked successfully",  newTable });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to book the table" });
    }
});

// Route for getting all tables for a restaurant
tableRouter.get("/:restaurantId", async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const tables = await tableModel.find({ RestaurantID: restaurantId });
        res.status(200).json({ msg: "Tables retrieved successfully", tables });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to retrieve tables" });
    }
});

// Route for getting a specific table by its ID
tableRouter.get("/:id", async (req, res) => {
    try {
        const table = await tableModel.findById(req.params.id);
        if (!table) {
            return res.status(404).json({ msg: "Table not found" });
        }
        res.status(200).json({ msg:"Table retrieved successfully",table });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to retrieve table" });
    }
});


// Route for updating a table's status
tableRouter.put("/:id", async (req, res) => {
    try {
      const { Status } = req.body;
      
      // Ensure the provided status is valid
      if (!["free", "occupied", "reserved"].includes(Status)) {
        return res.status(400).json({ msg: "Invalid status value" });
      }
  
      // Find the table by ID and update its status
      const updatedTable = await tableModel.findByIdAndUpdate(
        req.params.id,
        { Status },
        { new: true } // Return the updated document
      );
  
      // Check if the table was found and updated
      if (!updatedTable) {
        return res.status(404).json({ msg: "Table not found" });
      }
  
      // Send the updated table as the response
      res.status(200).json({ msg: "Table updated successfully", table: updatedTable });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to update table" });
    }
  });


// Route for deleting a table
tableRouter.delete("/:tableId", async (req, res) => {
    try {
        const { tableId } = req.params;
        const deletedTable = await tableModel.findByIdAndDelete(tableId);
        if (!deletedTable) {
            return res.status(404).json({ msg: "Table not found" });
        }
        res.status(200).json({ msg: "Table deleted successfully", table: deletedTable });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to delete table" });
    }
});



module.exports = {
    tableRouter
};
