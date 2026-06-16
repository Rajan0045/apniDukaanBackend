const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const multer = require('multer');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose-connection");
const env = require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//--------- for all static files(audio, vidio ,css, images) use this public path ------->
app.use(express.static(path.join(__dirname, "public")));

//---------------------- models --------------------------->
const userModel = require("./models/user-model");
const productModel = require("./models/product-model");

//------------------ routers ------------------------------->

const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");

app.use("/users", usersRouter, (req, res) => {
    res.send("Done")
});

app.use("/owners", ownersRouter, (req, res) => {
    res.send("Done")
});

app.use("/products", productsRouter, (req, res) => {
    res.send("Done")
});

app.listen(3000, () => { console.log("server running....") })