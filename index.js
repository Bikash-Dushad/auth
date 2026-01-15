const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db");
const routes = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
routes.forEach(({ path, router }) => {
  app.use(`/api${path}`, router);
});

app.get("/auth", async (req, res) => {
  return res.send("Hi auth");
});

const PORT = process.env.PORT || 3002;

// Connect to DB and start server for local development
if (process.env.NODE_ENV !== "production") {
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
} else {
  // For Vercel/production, just connect to DB
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
}

// Export for Vercel
module.exports = app;