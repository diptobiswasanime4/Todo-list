import { create } from "domain";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} = require("./controllers/todo");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    res.json(error);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await getTodo(Number(id));
    res.json(todo);
  } catch (error) {
    res.json(error);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { desc } = req.body;
    const newTodo = await createTodo(desc);
    res.json({ msg: "Todo added", success: true, newTodo: newTodo });
  } catch (error) {
    res.json(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { desc, completed } = req.body;
    const { id } = req.params;
    await updateTodo(Number(id), desc, completed);
    res.json({ msg: "Todo updated" });
  } catch (error) {
    res.json(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTodo(Number(id));
    res.json({ msg: "Todo deleted", success: true });
  } catch (error) {
    res.json(error);
  }
});

app.delete("/todos", async (req, res) => {
  try {
    await deleteAllTodos();
    res.json({ msg: "All todos deleted" });
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
