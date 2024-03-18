const express = require("express");
const {MenuItemModel} = require("../models/menus.model");

const menusRouter = express.Router();

// Create a new menu item
menusRouter.post("/", async (req, res) => {
    try {
        const { name, price, description, variety } = req.body;
        const menuItem = new MenuItemModel({ name, price, description, variety });
        await menuItem.save();
        res.status(201).json({ message: "Menu item created successfully", menuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create menu item" });
    }
});

// Get all menu items
menusRouter.get("/", async (req, res) => {
    try {
        const menuItems = await MenuItemModel.find();
        res.status(200).json({ message: "Menu items retrieved successfully", menuItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve menu items" });
    }
});

// Get a specific menu item by ID
menusRouter.get("/:id", async (req, res) => {
    try {
        const menuItem = await MenuItemModel.findById(req.params.id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ message: "Menu item retrieved successfully", menuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve menu item" });
    }
});

// Update a menu item
menusRouter.put("/:id", async (req, res) => {
    try {
        const { name, price, description, variety } = req.body;
        const updatedMenuItem = await MenuItemModel.findByIdAndUpdate(
            req.params.id,
            { name, price, description, variety },
            { new: true }
        );
        if (!updatedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ message: "Menu item updated successfully", menuItem: updatedMenuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update menu item" });
    }
});

// Delete a menu item
menusRouter.delete("/:id", async (req, res) => {
    try {
        const deletedMenuItem = await MenuItemModel.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json({ message: "Menu item deleted successfully", menuItem: deletedMenuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete menu item" });
    }
});

module.exports ={
    menusRouter
};
