import _ from 'lodash';
import classNames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateClaim, toggleSharing } from '../../actions/expense_actions';

import './expense_form.css';
import AddUserForm from './add_user_form';
import AddItemForm from './add_item_form';

const rows = {
    SubtotalRow: require('./rows/subtotal_row').default,
    ServiceChargeRow: require('./rows/service_charge_row').default
}

class ExpenseForm extends Component {
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
                    </tbody>
                </table>
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
                <th key={user} className="users">{user}</th>
            );
        });
    }

    renderBody() {
        return _.map(this.props.CurrentExpense.items, item => {
            return (
                <tr key={item.name} className={this.determineRowStyle(item)}>
                    {this.renderItem(item)}
                    {this.renderSharingCell(item)}
                    {this.renderExpense(item)}
                </tr>
            );
        });
    }

    determineRowStyle(item) {
        if (item.shared) {
            return classNames({
                'table-success': item.claimedQuantity > 0,
                'table-danger': item.claimedQuantity === 0
            });
        } else {
            const remainingQuantity = item.quantity - item.claimedQuantity;
            return classNames({
                'table-success': remainingQuantity === 0,
                'table-danger': remainingQuantity > 0,
                'table-warning': remainingQuantity < 0
            });
        }
    }

    renderItem(item) {
        return [
            (<th key='name'>{item.name}</th>),
            (<td className="quantity" key='quantity'>{item.quantity}</td>),
            (<td className="price" key='price'>
                {item.price * item.quantity}<br/>
                <small className="text-muted">({item.price})</small>
                </td>)
        ];
    }

    renderSharingCell(item) {
        return (
            <td className="shared">
                <div className="form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox"
                            checked={item.shared}
                            onChange={event => this.props.toggleSharing(item.name, event.target.checked)}/>
                    </label>
                </div>
            </td>
        );
    }

    renderExpense(item) {
        return _.keys(this.props.CurrentExpense.users).map(user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control" 
                            value={this.props.CurrentExpense.users[user].claims[item.name]}
                            onChange={event => this.props.updateClaim(user, item.name, event.target.value)} />
                    </div>
                </td>
            );
        });
    }

    renderSpecialRows() {
        return _.map(this.props.CurrentExpense.rows, row => {
            const SpecialRow = rows[row];
            return (<SpecialRow key={row} expenseData={this.props.CurrentExpense} />);
        });
    }

    renderUserCellOfSpecialRow(row) {
        return _(this.props.CurrentExpense.users)
          .keys().map(user => <td key={user}>{row.computeUser(user)}</td>)
          .value();
    }

    renderItemAdderRow() {
        return <tr><td colSpan="3"><AddItemForm /></td></tr>;
    }
}

function mapStateToProps({CurrentExpense}) {
    return {
        CurrentExpense
    };
}

export default connect(mapStateToProps, {updateClaim, toggleSharing})(ExpenseForm);