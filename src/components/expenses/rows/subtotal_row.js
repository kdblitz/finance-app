import _ from 'lodash';
import { sum } from '../../../utils';

export default class SubtotalRow {
    constructor(state) {
        this.expenseState = state;
    }

    computeUser(userName) {
        const userTotal = _(this.expenseState.state.users[userName].claims)
            .map((claim, itemName) => {
                const {price, quantity, claimedQuantity, shared} = this.expenseState.state.items[itemName];
                return shared ? (claimedQuantity ? claim * quantity / claimedQuantity * price : 0)
                    : claim * price;
            })
            .reduce(sum);

        return userTotal;
    }

    computeTotal() {
        return _(this.expenseState.state.items)
            .map(item => item.quantity * item.price)
            .reduce(sum);
    }
}