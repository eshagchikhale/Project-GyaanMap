const express = require("express");
const router = express.Router();
const feedbackController = require("../Controllers/feedbackController");
const auth = require("../Middleware/authMiddleware");


router.post("/", auth, feedbackController.addFeedback);


module.exports = router;
