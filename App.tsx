import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ Define the Task type (match DB schema)
type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed"; // matches DB enum
};

const App: React.FC = () => {
  // ✅ State definitions
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // ✅ Fetch tasks from backend
  const fetchTasks = async (): Promise<void> => {
    try {
      const response = await axios.get<Task[]>("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // ✅ Add a new task
  const addTask = async (): Promise<void> => {
    if (!title.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ✅ Delete a task
  const deleteTask = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ✅ Toggle task completion (status)
  const toggleTask = async (id: number): Promise<void> => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          TaskFlow ✅
        </h1>

        {/* Add Task Form */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <div>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks available.</p>
          ) : (
            tasks.map((task: Task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-gray-50 border rounded-lg p-3 mb-2"
              >
                <div>
                  <h2
                    className={`font-semibold ${
                      task.status === "completed" ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </h2>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`px-3 py-1 rounded-lg ${
                      task.status === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {task.status === "completed" ? "Done" : "Pending"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
