import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tiny-fab/dist/styles.css';
import './App.css';

import store from './store';
import { getUser } from './actions/authAction';

import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import Dashboard from './components/users/Dashboard';
import BootcampHome from './components/bootcamps/BootcampHome';
import SingleBootcamp from './components/bootcamps/SingleBootcamp';
import CreateBootcamp from './components/bootcamps/CreateBootcamp';

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
            <Route exact path="/bootcamps/:id" component={SingleBootcamp} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/create/bootcamp" component={CreateBootcamp} />
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
