import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./globalStyle.css";
import "./fontawesome";
import Feed from "./views/Feed";
import PostDetail from "./components/Organisms/PostDetail/PostDetail";
import { PostsProvider } from "./providers/posts" 


const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_HOST}/v2/api/graphql`,
});

const authLink = setContext((_, { headers }) => {
  const token = process.env.REACT_APP_ACCESS_TOKEN;
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
        <PostsProvider>
          <Route exact path="/">
            <Redirect to="/feed" />
          </Route>
          <Route path="/feed">
            <Feed />
          </Route>
          <Route path="/post_detail">
          <PostDetail />
        </Route>
        </PostsProvider>
      </ApolloProvider>
    </Router>
  );
}

export default App;
