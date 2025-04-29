
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const subgraphUri = "https://gateway.thegraph.com/api/subgraphs/id/FUv8Kpg9nkGhwtALr4YCYJwLDuCLKoA63LN7ZTF6dWN1"; //PRODTODO
// const subgraphUri = "https://api.studio.thegraph.com/query/60402/gospel-v2/version/latest"; //PRODTODO
// const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract"; //PRODTODO

const httpLink = createHttpLink({
  uri: subgraphUri,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_API_KEY}`,
    }
  }
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});