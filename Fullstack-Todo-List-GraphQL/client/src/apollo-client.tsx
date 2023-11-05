import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
