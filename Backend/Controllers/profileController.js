const User = require("../Models/User");

// @desc   Get logged-in user profile
// @route  GET /api/profile/me
// @access Private
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Update logged-in user profile
// @route  PUT /api/profile/me
// @access Private
const updateMyProfile = async (req, res) => {
  try {
    const { name, university, graduationYear, major } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update allowed fields only
    user.name = name || user.name;
    user.university = university || user.university;
    user.graduationYear = graduationYear || user.graduationYear;
    user.major = major || user.major;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      university: updatedUser.university,
      graduationYear: updatedUser.graduationYear,
      major: updatedUser.major,
    });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMyProfile, updateMyProfile };
