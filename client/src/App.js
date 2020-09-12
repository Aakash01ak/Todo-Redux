import React from 'react';
import Home from './Home'
import AppNavbar from './components/AppNavbar'
import { Container } from 'reactstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/authActions';

class App extends React.Component  {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
  return (
    <div>
      <Provider store={store}>
        <AppNavbar />
        <Router>
        <Container>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Container>
        </Router>
        </Provider>
    </div>
  );
  }
}

export default App;
