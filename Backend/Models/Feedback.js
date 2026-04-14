const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
    unique: true          // 🔥 ONE FEEDBACK PER USER
  },

  rating: { 
    type: Number, 
    min: 1, 
    max: 5, 
    required: true 
  },

  satisfied: { 
    type: Boolean, 
    required: true 
  },

  comment: { 
    type: String, 
    trim: true, 
    default: "" 
  },

  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
