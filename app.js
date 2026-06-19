const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const fs = require("fs");
const multer = require('multer');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const env = require("dotenv").config();
const connectDB = require("./config/mongoose-connection");
const flash = require("connect-flash");
const expressSession = require("express-session");

connectDB();
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_KEY,
    cookie: { secure: false }
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//--------- for all static files(audio, vidio ,css, images) use this public path ------->
app.use(express.static(path.join(__dirname, "public")));

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

//------------------ routers ------------------------------->
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const isLoggedIn = require("./middlewares/isLoggedIn");

app.use("/users", usersRouter);
app.use("/products", isLoggedIn, productsRouter);
app.use("/cart", isLoggedIn, cartRouter);
app.use("/order", isLoggedIn, orderRouter);


app.listen(3000, () => { console.log("server running....") })