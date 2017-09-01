import _ from 'lodash';
import classNames from 'classnames';
import React, { Component } from 'react';

import './expense_form.css';
import AddItemForm from './add_item_form';
import { sum } from '../../utils';
import SubtotalRow from './rows/subtotal_row';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: {
                'user a': {
                    claims: {
                        'item a': 0,
                        'item b': 0,
                        'item c': 0
                    }
                },
                'user b': {
                    claims: {
                        'item a': 0,
                        'item b': 0,
                        'item c': 0
                    }
                }
            },
            items: {
                'item a': {name: 'item a', price: 100, quantity: 10, claimedQuantity: 0, shared: false},
                'item b': {name: 'item b', price: 200, quantity: 5, claimedQuantity: 0, shared: false},
                'item c': {name: 'item c', price: 300, quantity: 3, claimedQuantity: 0, shared: false}
            },
            rows: [
                new SubtotalRow(this)
            ]
        };
    }

    render() {
        return (
            <div className="Expense-form">
                <h2>Expense form</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderItemHeader()}
                            {this.renderNameHeader()}
                            <th className="shared">Shared?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                        {this.renderSubtotalRow()}
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
        return _.keys(this.state.users).map(user => {
            return (
                <th key={user} className="users">{user}</th>
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

    renderBody() {
        return _.map(this.state.items, item => {
            return (
                <tr key={item.name} className={this.determineRowStyle(item)}>
                    {this.renderItem(item)}
                    {this.renderExpense(item)}
                    {this.renderSharingCell(item)}
                </tr>
            );
        });
    }

    toggleShared(event, itemName) {
        const items = _.cloneDeep(this.state.items);
        items[itemName].shared = event.target.checked;
        this.setState({
            items
        });
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

    renderExpense(item) {
        return _.keys(this.state.users).map(user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control" 
                            value={this.state.users[user].claims[item.name]}
                            onChange={(event) => this.updateClaim(event, user, item.name)} />
                    </div>
                </td>
            );
        });
    }

    renderSharingCell(item) {
        return (
            <td className="shared">
                <div className="form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox"
                            checked={item.shared}
                            onChange={event => this.toggleShared(event,item.name)}/>
                    </label>
                </div>
            </td>
        );
    }

    renderSubtotalRow() {
        return (
            <tr>
                <th>Total</th>
                <td className="price" colSpan={2}>{this.state.rows[0].computeTotal()}</td>
                {this.renderUserSubtotal()}
                <td></td>
            </tr>
        );
    }

    renderUserSubtotal() {
        return _(this.state.users)
          .keys().map(user => <td key={user}>{this.state.rows[0].computeUser(user)}</td>)
          .value();
    }

    renderItemAdderRow() {
        return <tr><td colSpan="3"><AddItemForm onItemAdd={data => this.addItem(data)} /></td></tr>;
    }


    addItem(item) {
        item.claimedQuantity = 0;
        item.shared = false;

        const items = _.cloneDeep(this.state.items);
        items[item.name] = item;

        const users = _.mapValues(_.cloneDeep(this.state.users), user => {
            user.claims[item.name] = 0;
            return user;
        });

        this.setState({
            items,
            users
        });
    }

    getClaimedQuantity(itemName, users = this.state.users) {
        return _(users).map(`claims[${itemName}]`)
            .reduce(sum);
    }

    updateClaim(event, user, itemName) {
        const users = _.cloneDeep(this.state.users);
        users[user].claims[itemName] = Number(event.target.value);

        const items = _.cloneDeep(this.state.items);
        items[itemName].claimedQuantity = this.getClaimedQuantity(itemName, users);

        this.setState({
            users,
            items
        });
    }
}

export default ExpenseForm;