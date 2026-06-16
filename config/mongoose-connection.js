const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(`${config.MONGODB_URL}/apnidukaan`).then(() => {
    console.log("DB connected...");
}).catch((e) => {
    console.log(e);
})

module.exports = mongoose.connection