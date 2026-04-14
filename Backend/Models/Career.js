const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    roadmap: [
      {
        level: String,
        duration: String,
        topics: [
          {
            title: String,
            link: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate save (same user + same career)
CareerSchema.index({ user: 1, title: 1 }, { unique: true });

module.exports = mongoose.model("Career", CareerSchema);
