require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Fallback route for non-matching requests
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
  });
