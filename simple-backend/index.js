const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const todos = [
  {
    id: 1,
    desc: "Write Python",
    completed: false,
  },
  {
    id: 2,
    desc: "Write JavaScript",
    completed: true,
  },
  {
    id: 3,
    desc: "Write SQL",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send("Todo List API Home Page");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  let todo = todos.filter((todo) => todo.id == req.params.id);
  res.json(todo);
});

app.post("/todos", (req, res) => {
  console.log(req.body);
  todos.push({ id: uuid.v4(), ...req.body });
  res.json(todos);
});

app.delete("/todos/:id", (req, res) => {
  let index = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(index, 1);
  res.json(todos);
});

app.put("/todos/:id", (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    todo.desc = req.body.desc;
    todo.completed = req.body.completed;
    res.json(todos);
  } else {
    res.send("Todo with given id doesn't exist!");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
