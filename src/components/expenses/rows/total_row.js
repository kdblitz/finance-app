import _ from 'lodash';

import { SubtotalRow } from './subtotal_row';
import { setupReduxBindings } from './computing_row';
import { sum } from '../../../utils';
import { key as paymentKey } from './payment_row';
import { key as changeKey } from './change_row';

export const key = 'total';

class TotalRow extends SubtotalRow {
    getRows(props) {
        return _(props.computations).omit([key, paymentKey, changeKey]);
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
            : rows.map(computation => {
                return (computation.total) ? computation.total : 0
            }).reduce(sum);
        return total;
    }
}

TotalRow.defaultProps = {
    label: 'Total',
    key
}

export default setupReduxBindings(TotalRow);