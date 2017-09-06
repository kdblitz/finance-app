import _ from 'lodash';

import { sum } from '../../../utils';

import BaseRow, { setupReduxBindings } from './base_row';

class SubtotalRow extends BaseRow {
    computeUser(props, user) {
        const userTotal = _(user.claims)
            .map((claim, itemName) => {
                const {price, quantity, claimedQuantity, shared} = props.expenseData.items[itemName];
                return shared ? (claimedQuantity ? claim * quantity / claimedQuantity * price : 0)
                    : claim * price;
            })
            .reduce(sum);
        return userTotal;        
    }

    computeTotal(props) {
        return _(props.expenseData.items)
            .map(item => item.quantity * item.price)
            .reduce(sum);
    }
}

SubtotalRow.defaultProps = {
    label: 'Subtotal',
    key: 'subtotal'
};

export default setupReduxBindings(SubtotalRow);