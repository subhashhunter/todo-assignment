import express from "express";
import { createTodo,updateTodo } from "../model/types.js";

const router = express.Router();

let tasks = [];
let id = 1;

router.get("/", (req, res) => {
  return res.json(tasks);
});

router.post("/", (req, res) => {
  const result = createTodo.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const { title, description } = result.data;

  const newTask = {
    id: id++,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const result = updateTodo.safeParse({ id: req.params.id });

  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const task = tasks.find((t) => t.id === parseInt(result.data.id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  return res.json(task);
});

router.delete("/:id", (req, res) => {
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  return res.json({ message: "Task deleted" });
});

export default router;
