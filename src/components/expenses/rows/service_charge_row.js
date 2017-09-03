import _ from 'lodash';
import { connect } from 'react-redux';
import { updateComputation } from '../../../actions/computation_actions';

import { sum } from '../../../utils';

import BaseRow from './base_row';

class ServiceChargeRow extends BaseRow {
    constructor(props) {
        super(props);
        this.percent = 0.12;
    }

    getDefaultLabel() {
        return 'Service Charge';
    }

    computeUser(props, user) {
        const userTotal = _(user.claims)
            .map((claim, itemName) => {
                const {price, quantity, claimedQuantity, shared} = this.props.expenseData.items[itemName];
                return shared ? (claimedQuantity ? claim * quantity / claimedQuantity * price : 0)
                    : claim * price;
            })
            .reduce(sum) * this.percent;

        return userTotal;
    }

    computeTotal(props) {
        return _(props.expenseData.items)
            .map(item => item.quantity * item.price)
            .reduce(sum) * this.percent;
    }
}

export default connect(null, { updateComputation })(ServiceChargeRow);