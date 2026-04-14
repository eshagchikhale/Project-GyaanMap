const express = require("express");
const { registerUser,loginUser,forgotPassword,logoutUser } = require("../Controllers/authController");

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/logout", logoutUser);



module.exports = router;
