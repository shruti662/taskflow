import express, { Request, Response } from "express";
import { pool } from "../db"; // adjust if path differs

const router = express.Router();

// ✅ Add new task
router.post("/tasks", async (req: Request, res: Response) => {
  try {
    console.log("📩 Received task:", req.body);   // 👈 log body

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description required" });
    }

    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, status) VALUES (?, ?, 'pending')",
      [title, description]
    );

    console.log("✅ Insert result:", result);   // 👈 log DB insert result

    return res.status(201).json({
      id: (result as any).insertId,
      title,
      description,
      status: "pending",
    });
  } catch (err) {
    console.error("❌ Error inserting task:", err);
    res.status(500).json({ error: "Database error" });
  }
});


// ✅ Get all tasks
router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const [rows]: any = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Delete task
router.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Toggle task status
router.put("/tasks/:id/toggle", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [rows]: any = await pool.query("SELECT status FROM tasks WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const currentStatus = rows[0].status;
    const newStatus = currentStatus === "completed" ? "pending" : "completed";

    await pool.query("UPDATE tasks SET status = ? WHERE id = ?", [newStatus, id]);

    res.json({ id, newStatus });
  } catch (err) {
    console.error("Error toggling task:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
