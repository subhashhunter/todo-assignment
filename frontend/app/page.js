"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const backendUrl = "http://localhost:3001/tasks";

  const fetchTasks = async () => {
    try {
      const res = await axios.get(backendUrl);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title || !description) {
      alert("Please enter both title and description");
      return;
    }
    try {
      await axios.post(backendUrl, { title, description });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.put(`${backendUrl}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${backendUrl}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📝 Todo App</h1>

      <div className="flex flex-col gap-3 mb-6">
        <input
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={addTask}
        >
          ➕ Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
            >
              <div>
                <strong>{t.title}</strong>: {t.description}
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`text-sm px-3 py-1 rounded text-white ${
                    t.completed ? "bg-green-600 hover:bg-green-700" : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {t.completed ? "✅ Completed" : "✔ Mark as Done"}
                </button>
                <button
                  onClick={() => deleteTask(t.id)}
                  className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

