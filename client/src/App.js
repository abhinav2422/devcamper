import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import store from './store';
import { getUser } from './actions/authAction';

import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import BootcampHome from './components/bootcamps/BootcampHome';

class App extends Component {
  componentDidMount() {
    store.dispatch(getUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar></AppNavbar>
            <Route exact path="/" component={Home} />
            <Route exact path="/bootcamps" component={BootcampHome} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
