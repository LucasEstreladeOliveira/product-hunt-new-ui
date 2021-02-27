import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router } from "react-router-dom";
import "./globalStyle.css";
import "./fontawesome";
import Feed from "./views/Feed";

const httpLink = createHttpLink({
  uri: 'https://api.producthunt.com/v2/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = 'ygVnSVdlCNNpA0u5irKml6ElMX792pcd-1SH2gCeMiY';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Feed />
      </ApolloProvider>
    </Router>
  );
}

export default App;
