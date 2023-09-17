const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();

app.use(express.json());

const connectionString =
  "mongodb+srv://diptobiswas:abcd1234@todolistapp.ygebw6q.mongodb.net/TodoList?retryWrites=true&w=majority";

const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", TaskSchema);

async function connectDB(url) {
  return mongoose.connect(url);
}

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.get("/todos", async (req, res) => {
  const tasks = await Task.find({});
  res.json(tasks);
});

app.get("/todos/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

app.post("/todos", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

app.delete("/todos/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  res.json(task);
});

app.put("/todos/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  res.json(task);
});

async function start() {
  try {
    await connectDB(connectionString);
    app.listen(PORT, () => {
      console.log(`App running on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
