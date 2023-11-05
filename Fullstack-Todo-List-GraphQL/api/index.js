const { v4 } = require("uuid");
const { ApolloServer, gql } = require("apollo-server");

todos = [
  {
    id: "1",
    desc: "Write JS",
    completed: true,
  },
  {
    id: "2",
    desc: "Write TS",
    completed: true,
  },
  {
    id: "3",
    desc: "Write Python",
    completed: false,
  },
];

const typeDefs = gql`
  type Todo {
    id: ID!
    desc: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(desc: String!): Todo
    toggleTodoCompleted(id: ID!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_, { desc }) => {
      const newTodo = { id: v4(), desc, completed: false };
      todos.push(newTodo);
      return newTodo;
    },
    deleteTodo: (_, { id }) => {
      const index = todos.findIndex((todo) => todo.id == id);
      const deletedTodo = todos[index];
      todos.splice(index, 1);
      return deletedTodo;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
