const express = require("express");
const uuid = require("uuid");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(cors());

// We have to use DB
const todos = [
  {
    id: 1,
    name: "Catch Jirachi",
    completed: true,
  },
  {
    id: 2,
    name: "Catch Celebi",
    completed: false,
  },
  {
    id: 3,
    name: "Catch Charizard",
    completed: true,
  },
];

app.get("/", (req, res) => {
  res.json({ msg: "Todo List Home Page" });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  let todo = todos.filter((todo) => todo.id == req.params.id);
  res.json({ msg: "1 Todo", data: todo });
});

// GET, POST, PUT, DELETE, PATCH
app.post("/todos", (req, res) => {
  console.log(req.body);
  todos.push({ id: uuid.v4(), ...req.body });
  res.json({ msg: "Add Todo", data: todos });
});

app.put("/todos/:id", (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    todo.name = req.body.name;
    todo.completed = req.body.completed;
    res.json({ msg: "Edit Todo", data: todos });
  } else {
    res.json({ msg: "Todo not found." });
  }
});

app.delete("/todos/:id", (req, res) => {
  let index = todos.findIndex((todo) => todo.id == req.params.id);
  todos.splice(index, 1);
  res.json({ msg: "Delete Todo", data: todos });
});

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
