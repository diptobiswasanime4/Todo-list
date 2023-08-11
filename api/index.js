const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://diptobiswasanime4:diptobiswas@todoapp.1ke0maa.mongodb.net/"
  )
  .then(() => console.log("Connected to DB"));

app.get("/", (req, res) => {
  res.send("Todo List");
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todos/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
