import React, { Component } from 'react';
import AddUserForm from './add_user_form'
import UserList from './users_list';

class UserView extends Component {
  render() {
    return (
      <div className="row">
        <UserList />
        <AddUserForm />
      </div>
    )
  }
}

export default UserView;