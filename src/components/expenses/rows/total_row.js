import _ from 'lodash';

import { SubtotalRow } from './subtotal_row';
import { setupReduxBindings } from './computing_row';
import { sum } from '../../../utils';

class TotalRow extends SubtotalRow {
    computeUser(props, user, username) {
        if (_.isEmpty(props.computations)) {
            return super.computeUser(props, user, username);
        }

        const userTotal = _(props.computations).omit('total')
            .map(computation => (computation.users) ? computation.users[username] : 0)
            .reduce(sum);
        return userTotal;
    }

    computeTotal(props) {
        if (_.isEmpty(props.computations)) {
            return super.computeTotal(props);
        }

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