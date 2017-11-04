import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchExpenseList } from '../../actions/expense_list_actions';

import {getExpenseFormLink} from '../../paths';

class ExpenseList extends Component {
  constructor(props) {
    super(props);
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
    return _.map(this.props.ExpenseList, (expense, expenseFormId) => {
      return (
        <NavLink to={getExpenseFormLink(expenseFormId)} exact className="nav-link list-group-item" key={expenseFormId}>
          {expense.title}
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