import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <a className="navbar-brand" href="/">
          Singils App
        </a>
        <div className="collapse navbar-collapse" id="navbarDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={PUBLIC_PATH} exact className="nav-link" activeClassName="active">List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={PUBLIC_PATH + "expense/new"} exact className="nav-link" activeClassName="active">New</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={PUBLIC_PATH + "users"} exact className="nav-link" activeClassName="active">Users</NavLink>
            </li>
          </ul>
        </div>
        <div>
          <button className="btn btn-outline-success" type="button">Login</button>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;