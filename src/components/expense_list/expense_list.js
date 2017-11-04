import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchExpenseList } from '../../actions/expense_list_actions';

import {GET_EXPENSE_FORM} from '../../paths';

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
    return _.map(this.props.ExpenseList, (expense, key) => {
      return (
        <NavLink to={`${GET_EXPENSE_FORM}${key}`} exact className="nav-link list-group-item" key={key}>
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