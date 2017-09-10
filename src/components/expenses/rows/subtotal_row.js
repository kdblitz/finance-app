import _ from 'lodash';

import { sum } from '../../../utils';

import ComputingRow, { setupReduxBindings } from './computing_row';

export class SubtotalRow extends ComputingRow {
    computeUser(props, user) {
        const userCount = _.size(props.expenseData.users);
        const userTotal = _(user.claims)
            .map((claim, itemName) => {
                const item = props.expenseData.items[itemName];
                return item.computeShare(claim, userCount);
            })
            .reduce(sum);
        return userTotal;
    }

    computeTotal(props) {
        return _(props.expenseData.items)
            .map(item => item.computeTotal())
            .reduce(sum);
    }
}

SubtotalRow.defaultProps = {
    label: 'Subtotal',
    key: 'subtotal'
};

export default setupReduxBindings(SubtotalRow);