import React, { Component } from 'react';
import AddUserForm from './components/users/add_user_form'
import UserList from './components/users/users_list';
import ExpenseForm from './components/expenses/expense_form';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <AddUserForm />
        <hr />
        <UserList />
        <hr />
        <ExpenseForm />
      </div>
    );
  }
}

export default App;
