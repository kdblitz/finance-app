import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import NavigationBar from './components/navigation_bar';
import UserView from './components/users/user_view';
import ExpenseForm from './components/expenses/expense_form';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container-fluid mt-3">
          <Switch>
            <Route path={PUBLIC_PATH + "users"} component={UserView}/>
            <Route path={PUBLIC_PATH} component={ExpenseForm}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
