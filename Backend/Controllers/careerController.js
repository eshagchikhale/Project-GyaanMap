const Career = require("../Models/Career");

// Save career
// Save career
exports.saveCareer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, roadmap } = req.body;

    const career = new Career({
      user: userId,
      title,
      description,
      roadmap,
    });

    await career.save();

    res.status(201).json(career);
  } catch (err) {
    // 🔴 Duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Career already saved",
      });
    }

    console.error("Save career error:", err);
    res.status(500).json({ error: "Failed to save career" });
  }
};



// Get all saved careers of logged-in user
exports.getMyCareers = async (req, res) => {
  try {
    const userId = req.user.id;
    const careers = await Career.find({ user: userId });
    res.json(careers);
  } catch (err) {
    console.error("Get careers error:", err.message);
    res.status(500).json({ error: "Failed to fetch careers" });
  }
};

// Get single saved career by ID
exports.getCareerById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const career = await Career.findOne({ _id: id, user: userId });
    if (!career) {
      return res.status(404).json({ error: "Career not found" });
    }

    res.json(career);
  } catch (err) {
    console.error("Get career error:", err.message);
    res.status(500).json({ error: "Failed to fetch career" });
  }
};
