import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { client } from './graphql/client';

import Login from './screens/Login';
import Register from './screens/Register/index';
import HeaderMenu from './components/HeaderMenu';
import Home from './screens/Home';
import Pets from './screens/Pets';
import Clients from './screens/Clients';
import Services from './screens/Services';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/services">
            <HeaderMenu>
              <Services />
            </HeaderMenu>
          </Route>
          <Route path="/clients">
            <HeaderMenu>
              <Clients />
            </HeaderMenu>
          </Route>
          <Route path="/pets">
            <HeaderMenu>
              <Pets />
            </HeaderMenu>
          </Route>
          <Route path="/home">
            <HeaderMenu>
              <Home />
            </HeaderMenu>
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
