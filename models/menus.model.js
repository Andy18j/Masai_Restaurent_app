const mongoose = require("mongoose");

const MenuItemSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    variety: {
        type: String,
        enum: ['vegetarian', 'non-vegetarian', 'vegan'],
        default: 'non-vegetarian' // default value if not specified
    }
});

const MenuItemModel = mongoose.model("MenuItem", MenuItemSchema);

module.exports = {
    MenuItemModel
};
