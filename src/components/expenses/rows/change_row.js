import ComputingRow, { setupReduxBindings } from './computing_row';

export const key = 'change';

class ChangeRow extends ComputingRow {
    computeUser(props, user, username) {
        const {payment, total} = props.computations;
        return payment.users[username] - total.users[username];
    }

    computeTotal(props) {
        return '';
    }
}

ChangeRow.defaultProps = {
    label: 'Change',
    key
}

export default setupReduxBindings(ChangeRow);