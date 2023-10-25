const { ApolloServer, gql } = require("apollo-server");
const express = require("express");
const { v4 } = require("uuid");

const app = express();

const PORT = 3000;

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean
  }

  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(title: String!): Todo
    toggleCompleted(id: ID!): Todo
  }
`;

let todos = [];

const resolvers = {
  Query: {
    todos() {
      return todos;
    },
  },
  Mutation: {
    addTodo(_, args) {
      const newTodo = { id: v4(), title: args.title, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
    toggleCompleted(_, args) {
      const todo = todos.find((todo) => todo.id == args.id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      return todo;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`App running at ${url}`);
});

app.get("/", (req, res) => {
  res.send("Todo List Home Page");
});

app.listen(PORT, () => {
  console.log(`App running at PORT ${PORT}...`);
});
