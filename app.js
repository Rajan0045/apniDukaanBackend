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
const db = require("./config/mongoose-connection");
const env = require("dotenv").config();
const flash = require("connect-flash");
const expressSession = require("express-session");

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
        origin: "http://localhost:5173",
        credentials: true,
    })
);

//------------------ routers ------------------------------->
const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const cartRouter = require("./routes/cartRouter");
const isLoggedIn = require("./middlewares/isLoggedIn");

app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", isLoggedIn, productsRouter);
app.use("/cart", isLoggedIn, cartRouter);


app.listen(3000, () => { console.log("server running....") })