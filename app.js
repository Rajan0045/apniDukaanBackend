const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const multer = require('multer');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");


app.listen(3000, () => { console.log("server running....") })