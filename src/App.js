import React, { Component } from 'react';
import AddUserForm from './components/users/add_user_form'
import UserList from './components/users/users_list';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <AddUserForm />
        <hr />
        <UserList />
      </div>
    );
  }
}

export default App;
