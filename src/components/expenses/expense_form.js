import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExpenseData, saveExpenseData, removeUser }
  from '../../actions/expense_actions';

import './expense_form.css';
import AddUserForm from './add_user_form';
import AddItemForm from './add_item_form';
import ItemRow from './rows/item_row';
import PaymentRow from './rows/payment_row';
import ChangeRow from './rows/change_row';

import SubtotalRow from './rows/subtotal_row';
import ServiceChargeRow from './rows/service_charge_row';
import TotalRow from './rows/total_row';

const rows = {
  SubtotalRow,
  ServiceChargeRow,
}

class ExpenseForm extends Component {
  componentDidMount() {
    this.props.fetchExpenseData();
  }

  render() {
    return (
      <div className="Expense-form">
        <h2>Expense form</h2>
        <table className="table">
          <thead>
            <tr>
              {this.renderItemHeader()}
              <th className="shared">Shared?</th>
              {this.renderNameHeader()}
              <th className="addUser">
                <AddUserForm />
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
            {this.renderSpecialRows()}
            {this.renderItemAdderRow()}
            {this.renderFooterRows()}
          </tbody>
        </table>
        <button className="btn btn-primary"
          onClick={() => this.saveExpense()}>Save</button>
      </div>
    );
  }

  renderItemHeader() {
    return _.map(['Name', 'Quantity', 'Price'],
      name => <th key={name} className={name.toLowerCase()}>{name}</th>);
  }

  renderNameHeader() {
    return _.keys(this.props.CurrentExpense.users).map(user => {
      return (
        <th key={user} className="users">
          <span>{user}</span>
          <button className="btn btn-danger"
            onClick={() => this.props.removeUser(user)}>-</button></th>
      );
    });
  }

  renderBody() {
    return _.map(this.props.CurrentExpense.items, item =>
      <ItemRow key={item.name} item={item} users={this.props.CurrentExpense.users} />);
  }

  renderSpecialRows() {
    const currentRows = _.cloneDeep(this.props.CurrentExpense.rows) || [];
    if (currentRows.length) {
      currentRows.push({
        type: 'SubtotalRow'
      });
    }

    const specialRows = _.map(currentRows, row => {
      const SpecialRow = rows[row.type];
      return (
        <SpecialRow key={row.type} expenseData={this.props.CurrentExpense}
          computations={this.props.Computations} />
      );
    });

    return specialRows;
  }

  renderFooterRows() {
    return _.map([TotalRow, PaymentRow, ChangeRow],
      (Row, idx) => <Row key={idx} expenseData={this.props.CurrentExpense} computations={this.props.Computations}/>);
  }

  renderItemAdderRow() {
    return <tr><td colSpan="3"><AddItemForm /></td></tr>;
  }

  saveExpense() {
    const { users, items, rows } = this.props.CurrentExpense;
    this.props.saveExpenseData({
      users,
      items,
      rows
    });
  }

}

function mapStateToProps({ CurrentExpense, Computations }) {
  return {
    CurrentExpense,
    Computations
  };
}

export default connect(mapStateToProps, {
  fetchExpenseData,
  saveExpenseData,
  removeUser
})(ExpenseForm);