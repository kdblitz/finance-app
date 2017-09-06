import _ from 'lodash';

import BaseRow, { setupReduxBindings } from './base_row';
import { sum } from '../../../utils';

class TotalRow extends BaseRow {
    computeUser(props, user, username) {
        const userTotal = _(props.computations).omit('total')
            .map(computation => (computation.users) ? computation.users[username] : 0)
            .reduce(sum);
        return userTotal;
    }

    computeTotal(props) {
        const total = _(props.computations).omit('total')
            .map(computation => (computation.total) ? computation.total : 0)
            .reduce(sum);
        return total;
    }
}

TotalRow.defaultProps = {
    label: 'Total',
    key: 'total'
}

export default setupReduxBindings(TotalRow);