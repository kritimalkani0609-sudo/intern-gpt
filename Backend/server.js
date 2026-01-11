// Backend/server.js

const express = require("express");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Future API route (example)
app.post("/analyze", (req, res) => {
  const message = req.body.message;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.json({
    risk: "Low",
    note: "This is a demo backend response"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
