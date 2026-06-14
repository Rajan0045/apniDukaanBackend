const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/apnidukaan").then(() => {
    console.log("DB connected...");
}).catch((e) => {
    console.log(e);
})

module.exports = mongoose.connection