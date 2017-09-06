import BaseRow, { setupReduxBindings } from './base_row';

class ServiceChargeRow extends BaseRow {
    constructor(props) {
        super(props);
        this.percent = 0.12;
    }

    computeUser(props, user, username) {
        const { subtotal } = props.computations;
        return (subtotal) ? subtotal.users[username] * this.percent : 0;
    }

    computeTotal(props) {
        const { subtotal } = props.computations;
        return (subtotal) ? subtotal.total * this.percent : 0;
    }
}

ServiceChargeRow.defaultProps = {
    label: 'Service Charge',
    key: 'serviceCharge'
}

export default setupReduxBindings(ServiceChargeRow);