const express = require("express");
const mysql = require("mysql");

const app = express();

const PORT = 3000;

app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_list_db",
});

connection.connect((err) => {
  if (err) {
    console.log("We got an error.", err);
  } else {
    console.log("Connected to MySQL DB");
  }
});

app.get("/", (req, res) => {
  res.send("Todo List Home Page");
});

app.get("/todos", (req, res) => {
  const sqlQuery = "SELECT * FROM todo_list";
  connection.query(sqlQuery, (err, data) => {
    if (err) {
      return res.json({ msg: "We got an Error", data: err });
    }
    console.log(data);
    return res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}...`);
});
