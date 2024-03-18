const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
    RestaurantID: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    TableNumber: { type: Number, required: true },
    Status: { type: String,enum: ["free", "occupied", "reserved"],required:true}
});

const tableModel = mongoose.model("Table", tableSchema);

module.exports = {
    tableModel
};
