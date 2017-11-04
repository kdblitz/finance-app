import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchExpenseList } from '../../actions/expense_list_actions';
import { deleteExpenseData } from '../../actions/expense_actions';

import { getExpenseFormLink } from '../../paths';

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
          <div className="d-flex flex-row justify-content-between">
            <span className="align-self-center">{expense.name}</span>
            <span className="btn btn-danger" onClick={event => this.deleteExpenseData(event, expenseFormId)}>Delete</span>
          </div>
        </NavLink>
      );
    });
  }

  deleteExpenseData(event, expenseFormId) {
    this.props.deleteExpenseData(expenseFormId);
    event.preventDefault();
  }
}

function mapStateToProps({ExpenseList}) {
  return {
    ExpenseList
  };
}

export default connect(mapStateToProps, {
  fetchExpenseList,
  deleteExpenseData
})(ExpenseList);