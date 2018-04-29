import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTitle, fetchExpenseData, saveExpenseData, removeUser }
  from '../../actions/expense_actions';
import { clearComputation } from '../../actions/computation_actions';
import { match } from 'react-router-dom';
import { getExpenseFormLink } from '../../paths';

import './expense_form.css';
import AddUserForm from './add_user_form';
import AddItemForm from './add_item_form';
import ItemRow from './rows/item_row';
import PaymentRow from './rows/payment_row';
import ChangeRow from './rows/change_row';

import SubtotalRow from './rows/subtotal_row';
import ServiceChargeRow from './rows/service_charge_row';
import TotalRow from './rows/total_row';

import Computation from './models/computation';
import { hasWriteAccess } from '../../utils/auth';

const rows = {
  SubtotalRow,
  ServiceChargeRow,
}

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBreakdown: true,
      showPaid: true
    };

    this.determineShownUser = this.determineShownUser.bind(this);
  }

  toggleView(viewMode) {
    this.setState({
      [viewMode]: !this.state[viewMode]
    })
  }

  getExpenseId() {
    return this.props.match.params.expenseId;
  }

  componentDidMount() {
    this.props.clearComputation();
    this.props.fetchExpenseData(this.getExpenseId());
  }

  hasWriteAccess() {
    return hasWriteAccess(this.props.CurrentExpense);
  }

  determineShownUser(user) {
    return this.state.showPaid ? true : !this.props.Computations.isPaymentSettled(user);
  }

  render() {
    if (_.isEmpty(this.props.CurrentExpense)) {
      return (null);
    }
    return (
      <div className="Expense-form">
        <div className="title d-flex flex-row align-items-center mb-3">
          {this.hasWriteAccess() ? (<input type="text" className="form-control col-2 mr-4"
            value={this.props.CurrentExpense.name}
            onChange={event => this.props.updateTitle(event.target.value)}/>) 
            : <h2 className="mr-4">{this.props.CurrentExpense.name}</h2>}
          <span className="oi oi-eye mr-2"></span>
          <div className="btn-group mr-2" role="group">
            <button type="button" className="btn btn-primary"
              onClick={() => this.toggleView('showBreakdown')}>Breakdown</button>
            <button type="button" className={`btn btn-primary ${this.state.showPaid ? 'active': ''}`}
              onClick={() => this.toggleView('showPaid')}>Settled</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              {this.renderItemHeader()}
              <th className="shared">Shared?</th>
              {this.renderNameHeader()}
              {this.renderAddUserForm()}
            </tr>
          </thead>
          <tbody>
            {this.renderBody()}
            {this.renderSpecialRows()}
            {this.renderItemAdderRow()}
            {this.renderFooterRows()}
          </tbody>
        </table>
        { this.hasWriteAccess() ? <button className="btn btn-primary"
          onClick={() => this.saveExpense()}>Save</button> : null}
      </div>
    );
  }

  renderItemHeader() {
    return _.map(['Name', 'Quantity', 'Price'],
      name => <th key={name} className={name.toLowerCase()}>{name}</th>);
  }

  renderNameHeader() {
    return _.keys(this.props.CurrentExpense.users)
    .filter(this.determineShownUser)
    .map(user => {
      const deleteButton = this.hasWriteAccess() ?
        (<button className="btn btn-outline-danger btn-sm"
          onClick={() => this.props.removeUser(user)}>
          <span className="oi oi-trash"></span></button>) : '';

      return (
        <th key={user} className="users">
          <span className="name">{user}</span>
          {deleteButton}
        </th>
      );
    });
  }

  renderAddUserForm() {
    if (this.hasWriteAccess()) {
      return (
        <th className="addUser">
          <AddUserForm />
        </th>
      );
    }
    return null;
  }

  renderBody() {
    if (!this.state.showBreakdown)
      return <th colSpan="3">
        <span className="mr-2">Contents hidden</span> 
        <span className="link" onClick={() => this.toggleView('showBreakdown')}>(Show Breakdown)</span>
      </th>;

    return _.map(this.props.CurrentExpense.items, item =>
      <ItemRow key={item.name + this.state.showPaid}
        item={item} 
        users={this.props.CurrentExpense.users} 
        hasWriteAccess={this.hasWriteAccess()}
        determineShownUser={this.determineShownUser}/>
    );
  }

  renderSpecialRows() {
    if (!this.state.showBreakdown)
      return;

    const currentRows = _.cloneDeep(this.props.CurrentExpense.rows) || [];
    if (currentRows.length) {
      currentRows.push({
        type: 'SubtotalRow'
      });
    }

    const specialRows = _.map(currentRows, row => {
      const SpecialRow = rows[row.type];
      return (
        <SpecialRow key={row.type + this.state.showPaid}
          expenseData={this.props.CurrentExpense}
          computations={this.props.Computations}
          config={row.config}
          hasWriteAccess={this.hasWriteAccess()}
          determineShownUser={this.determineShownUser}/>
      );
    });

    return specialRows;
  }

  renderFooterRows() {
    return _.map([TotalRow, PaymentRow, ChangeRow],
      (Row, idx) => 
        <Row key={idx + this.state.showPaid}
          expenseData={this.props.CurrentExpense}
          computations={this.props.Computations}
          hasWriteAccess={this.hasWriteAccess()}
          determineShownUser={this.determineShownUser}/>
    );
  }

  renderItemAdderRow() {
    return this.hasWriteAccess() 
      ? <tr><td colSpan="4"><AddItemForm /></td></tr>
      : null;
  }

  saveExpense() {
    const { users, items, rows } = this.props.CurrentExpense;
    this.props.saveExpenseData(this.getExpenseId(), this.props.CurrentExpense, this.props.Computations)
      .then(expenseId => {
        if (this.getExpenseId() !== expenseId) {
          this.props.history.push(getExpenseFormLink(expenseId))
        }
      });
  }

}

function mapStateToProps({ CurrentExpense, Computations }) {
  return {
    CurrentExpense,
    Computations: _.assign(new Computation(), Computations)
  };
}

export default connect(mapStateToProps, {
  fetchExpenseData,
  saveExpenseData,
  updateTitle,
  removeUser,
  clearComputation
})(ExpenseForm);