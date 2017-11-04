import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { EXPENSE_LIST, NEW_EXPENSE, USERS_LIST} from '../paths';

class NavigationBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <NavLink to={EXPENSE_LIST} exact className="navbar-brand">
          Singils App
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={EXPENSE_LIST} exact className="nav-link" activeClassName="active">List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={NEW_EXPENSE} exact className="nav-link" activeClassName="active">New</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={USERS_LIST} exact className="nav-link" activeClassName="active">Users</NavLink>
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