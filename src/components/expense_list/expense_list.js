import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchExpenseList } from '../../actions/expense_list_actions';

class ExpenseList extends Component {
  constructor(props) {
    super(props);
    // this.list = {
    //   '123': {title:'test title'}
    // };
  }

  componentDidMount() {
    this.props.fetchExpenseList();
  }

  render() {
    return (
      <div className="col-md">
        <h2>Expenses</h2>
        <div className="list-group">
          {this.renderExpenses()}
        </div>
      </div>
    );
  }

  renderExpenses() {
    return _.map(this.props.ExpenseList, (expense, key) => {
      return (
        <NavLink to={PUBLIC_PATH + "expense/" + key} exact className="nav-link" key={key}>
          <div className="list-group-item">
            {expense.title}
          </div>
        </NavLink>
      );
    });
  }
}

function mapStateToProps({ExpenseList}) {
  return {
    ExpenseList
  };
}

export default connect(mapStateToProps, {
  fetchExpenseList
})(ExpenseList);