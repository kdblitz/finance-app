import _ from 'lodash';

import { SubtotalRow } from './subtotal_row';
import { setupReduxBindings } from './computing_row';
import { sum } from '../../../utils';

class TotalRow extends SubtotalRow {
    getRows(props) {
        return _(props.computations).omit('total')
    }

    computeUser(props, user, username) {
        const rows = this.getRows(props);
        const userTotal = rows.isEmpty()
            ? super.computeUser(props, user, username)
            : rows.map(computation => (computation.users) ? computation.users[username] : 0)
                .reduce(sum);
        return userTotal;
    }

    computeTotal(props) {
        const rows = this.getRows(props);
        const total = rows.isEmpty() 
            ? super.computeTotal(props)
            : rows.map(computation => (computation.total) ? computation.total : 0)
                .reduce(sum);
        return total;
    }
}

TotalRow.defaultProps = {
    label: 'Total',
    key: 'total'
}

export default setupReduxBindings(TotalRow);