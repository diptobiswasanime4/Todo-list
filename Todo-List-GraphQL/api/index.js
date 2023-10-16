const { ApolloServer, gql } = require("apollo-server");
const express = require("express");

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
  }
`;

let todos = {};

const resolvers = {};

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
