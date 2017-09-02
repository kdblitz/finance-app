import _ from 'lodash';
import { sum } from '../../../utils';

import BaseRow from './base_row';

export default class SubtotalRow extends BaseRow {
    getDefaultLabel() {
        return 'Subtotal';
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