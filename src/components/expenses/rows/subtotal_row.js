import React, { Component } from 'react';

import _ from 'lodash';
import { sum } from '../../../utils';

import BaseRow from './base_row';

export default class SubtotalRow extends Component /*extends BaseRow*/ {
    renderUserCellOfSpecialRow() {
        return _(this.props.expenseData.users)
            .keys().map(user => <td key={user}>{this.computeUser(user)}</td>)
            .value();
    }

    render() {
        return (
            <tr>
                <th>Subtotal</th>
                <td className="price" colSpan={2}>{this.computeTotal()}</td>
                <td></td>
                {this.renderUserCellOfSpecialRow()} 
            </tr>
        )
    }

    computeUser(userName) {
        const userTotal = _(this.props.expenseData.users[userName].claims)
            .map((claim, itemName) => {
                const {price, quantity, claimedQuantity, shared} = this.props.expenseData.items[itemName];
                return shared ? (claimedQuantity ? claim * quantity / claimedQuantity * price : 0)
                    : claim * price;
            })
            .reduce(sum);

        return userTotal;
    }

    computeTotal() {
        return _(this.props.expenseData.items)
            .map(item => item.quantity * item.price)
            .reduce(sum);
    }
}