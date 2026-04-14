require("dotenv").config();
const express = require("express");
const connectDB = require("./Config/db");
const cors = require("cors");

const authRoutes = require("./Routes/auth");
const career = require("./Routes/careerRoutes")
const feedbackRoutes = require("./Routes/feedbackRoutes");
const authMiddleware = require("./Middleware/authMiddleware");
// const quizRoutes = require('./Routes/quizRoutes');


const app = express();
app.use(cors({ origin: "http://localhost:5173"}));
app.use(express.json());

app.get("/", (req, res) => {res.json({ ok: true, msg: "GyaanMap backend running" });});

app.use("/api/auth", authRoutes);
app.use("/api/careers", authMiddleware, career);
app.use("/api/profile", require("./Routes/profileRoutes"));
app.use("/api/feedback", feedbackRoutes);
// app.use('/api/quiz', quizRoutes);



const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});