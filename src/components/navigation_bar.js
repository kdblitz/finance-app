import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { EXPENSE_LIST, NEW_EXPENSE, USERS_LIST} from '../paths';

import { login, logout, fetchUser } from '../actions/user_actions';

class NavigationBar extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <NavLink to={EXPENSE_LIST} exact className="navbar-brand">
          Singils App
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarDropdown">
          <ul className="navbar-nav mr-auto">
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
          <div className="navbar-nav">
            {this.renderUserPanel()}
          </div>
        </div>
      </nav>
    );
  }

  renderUserPanel() {
    return (this.props.Users.user)
      ? this.renderUserDropdown()
      : (<button className="btn btn-outline-success" type="button" onClick={() => this.props.login()}>Login</button>);
  }
  
  renderUserDropdown() {
    return (
      <div className="nav-item dropdown">
        <div className="nav-link dropdown-toggle" id="userOptionsDropdown" data-toggle="dropdown">Hi {this.props.Users.user.displayName}!</div> 
        <div className="dropdown-menu" aria-labelledby="userOptionsDropdown">
          <div className="dropdown-item" onClick={() => this.props.logout()}>Logout</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({Users}) {
  return {
    Users
  };
}

export default connect(mapStateToProps, {
  login, logout, fetchUser
})(NavigationBar);