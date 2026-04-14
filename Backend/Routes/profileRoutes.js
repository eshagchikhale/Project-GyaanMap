const express = require("express");
const router = express.Router();
const { getMyProfile, updateMyProfile } = require("../Controllers/profileController");
const auth = require("../Middleware/authMiddleware");

// GET logged-in user's profile
router.get("/me", auth, getMyProfile);

// UPDATE logged-in user's profile
router.put("/me", auth, updateMyProfile);

module.exports = router;
