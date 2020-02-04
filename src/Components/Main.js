import React from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import User from './User';
import Home from './Home';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light">
            <ul class="navbar-nav mr-auto">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/user">User</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <ul class="navbar-nav ml-auto">
              <li><NavLink to="/register">Sign up</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
          </nav>
          <Route exact path="/" render={() => <Home AppName={this.props.AppName} />} />
          <Route path="/user" component={User} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </HashRouter>
    );
  }
}

export default Main;
