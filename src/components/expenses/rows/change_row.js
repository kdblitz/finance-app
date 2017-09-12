import ComputingRow, { setupReduxBindings } from './computing_row';

export const key = 'change';

class ChangeRow extends ComputingRow {
    computeUser(props, user, username) {
        return 0;
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