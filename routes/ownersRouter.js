const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.post("/create", async (req, res) => {
    try {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(503).json({
                success: false,
                message: "You are not authorized for create user"
            })
        }
        else {
            const { fullName, email, password } = req.body;
            let owner = await ownerModel.create({
                fullName,
                email,
                password,
            })
            return res.status(200).json({
                success: true,
                message: "Owner created successfully",
                owner
            })
        }
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong"
        })
    }
})

module.exports = router;
