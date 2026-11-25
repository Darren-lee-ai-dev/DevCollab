
import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

// Homepage API
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to DevCollab Backend API",
    status: "running"
  });
});

// Health check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevCollab API is healthy",
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `DevCollab backend running at http://localhost:${PORT}`
  );
});
