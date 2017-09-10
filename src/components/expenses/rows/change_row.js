import ComputingRow, { setupReduxBindings } from './computing_row';

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
    key: 'change'
}

export default setupReduxBindings(ChangeRow);