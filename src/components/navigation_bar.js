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
              <NavLink to="/" exact className="nav-link" activeClassName="active">Expenses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" exact className="nav-link" activeClassName="active">Users</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;