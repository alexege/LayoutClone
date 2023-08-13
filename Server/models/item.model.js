const mongoose = require("mongoose");

const Item = mongoose.model(
    "Item",
    new mongoose.Schema({
        title: String,
        url: String,
        description: String
    },
    { timestamps: true})
)

module.exports = Item;