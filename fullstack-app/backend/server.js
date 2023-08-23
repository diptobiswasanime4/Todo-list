const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

const connectionString =
  "mongodb+srv://dipto:abcd1234@todolist-3.xxqvh3s.mongodb.net/Todo-List?retryWrites=true&w=majority";

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
