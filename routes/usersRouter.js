const express = require("express");
const router = express.Router();
const { userRegister, userLogin, userLogout, getProfile, updateProfile,  } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/multer-config");


router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/profile", isLoggedIn, getProfile);
router.put("/update", isLoggedIn, upload.single("image"), updateProfile);

module.exports = router;
