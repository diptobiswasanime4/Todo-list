const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const pool = require("./db");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.post("/todos", async (req, res) => {
  try {
    const { desc, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (todo_desc, todo_completed) VALUES($1, $2) RETURNING *",
      [desc, completed]
    );
    res.json(newTodo);
  } catch (error) {
    res.json({ error });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.json(todos.rows);
  } catch (error) {
    res.json({ error });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    res.json({ error });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc, completed } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET todo_desc = $1, todo_completed = $2 WHERE todo_id = $3",
      [desc, completed, id]
    );
    res.json({ msg: "Todo updated!", success: true });
  } catch (error) {
    res.json({ error });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json({ msg: "Todo deleted!", success: true });
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
