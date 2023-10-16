const express = require("express");
const mongoose = require("mongoose");

const PORT = 3000;

const connectionString =
  "mongodb+srv://diptobiswas:abcd1234@todolistapp.1gjc5jj.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Got an errpr", err));

const app = express();

app.use(express.json());

const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", TodoSchema);

app.get("/", (req, res) => {
  res.send("Todo List Home Page");
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
});

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.json(todo);
});
app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  res.json(todo);
});

function connectDB(url) {
  return mongoose.connect(url);
}

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

// start();

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
