import express from "express";
import taskRoutes from "./routes/tasks";
import cors from "cors";



const app = express();

// Middleware
app.use(express.json()); // 👈 must be here to parse req.body

app.use(cors());
// Routes
app.use("/api", taskRoutes);

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
