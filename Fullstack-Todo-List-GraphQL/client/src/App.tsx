import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import TodoList from "./TodoList";

function App() {
  return (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  );
}

export default App;
