require("dotenv").config();

const express = require("express");
const app = express();
const dns = require("dns");
const cors = require("cors");
const path = require("path");

const connectDb = require("./src/config/db");
const router = require("./src/routes/notes.routes");



// Middleware
app.use(express.json());

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.Frontend
        : "http://localhost:5173",
    credentials: true,
  })
);

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Routes
app.use("/api/notes", router);

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});