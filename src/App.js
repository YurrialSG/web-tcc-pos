import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql/client';

import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
        <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
