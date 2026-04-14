const express = require("express");
const router = express.Router();
const careerController = require("../Controllers/careerController");
const auth = require("../Middleware/authMiddleware");

// Save a career
router.post("/", auth, careerController.saveCareer);

// Get all saved careers for this user
router.get("/my", auth, careerController.getMyCareers);

// Get details of one career
router.get("/:id", auth, careerController.getCareerById);

module.exports = router;
