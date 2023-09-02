const mongoose = require("mongoose");

const Layout = mongoose.model(
    "Layout",
    new mongoose.Schema({
        items: []
    },
    { timestamps: true})
)

module.exports = Layout;