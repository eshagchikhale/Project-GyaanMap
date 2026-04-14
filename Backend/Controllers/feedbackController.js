const Feedback = require("../Models/Feedback");

exports.addFeedback = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, satisfied, comment } = req.body;

    // 🔥 Only rating & satisfied are mandatory
    if (!rating || satisfied === undefined) {
      return res.status(400).json({ error: "Rating and satisfaction are required" });
    }

    // 🔥 Save only ONE feedback per user (overwrite old)
    const feedback = await Feedback.findOneAndUpdate(
      { user: userId },     // find by user
      {
        rating,
        satisfied,
        comment,
        updatedAt: new Date()
      },
      {
        new: true,
        upsert: true        // create if not exists
      }
    );

    res.status(200).json({
      message: "Feedback saved successfully",
      feedback
    });

  } catch (err) {
    console.error("Feedback submit error:", err);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};
