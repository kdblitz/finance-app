import ComputingRow, { setupReduxBindings } from './computing_row';

class ServiceChargeRow extends ComputingRow {
    constructor(props) {
        super(props);
    }

    computeUser(props, user, username) {
        const { subtotal } = props.computations;
        return (subtotal && this.state.config) ? subtotal.users[username] * this.state.config.percent : 0;
    }

    computeTotal(props) {
        const { subtotal } = props.computations;
        return (subtotal && this.state.config) ? subtotal.total * this.state.config.percent : 0;
    }
}

ServiceChargeRow.defaultProps = {
    label: 'Service Charge',
    key: 'serviceCharge',
    allowDeletion: true,
    config: {
      percent: 0.12
    }
}

export default setupReduxBindings(ServiceChargeRow);