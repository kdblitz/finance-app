import React from 'react'
import ComputingRow, { setupReduxBindings } from './computing_row';

class ServiceChargeRow extends ComputingRow {
    constructor(props) {
        super(props);
    }

    computeUser(props, user, username) {
        const { subtotal } = props.computations;
        return (subtotal && props.config) ? subtotal.users[username] * props.config.percent : 0;
    }

    computeTotal(props) {
        const { subtotal } = props.computations;
        return (subtotal && props.config) ? subtotal.total * props.config.percent : 0;
    }

    renderConfig() {
      return (
        <div>
          <label htmlFor="percent">Percent</label>
          <input type="text" className="form-control" id="percent" 
            value={(this.props.config) ? this.props.config.percent : this.props.defaultConfig.percent}
            onChange={event => this.updateConfig(event.target.value)}
          />
        </div>
      );
    }

    updateConfig(value) {
      this.props.updateRowConfig(
        this.constructor.name, {percent: value}
      );
      this.compute();
    }
}

ServiceChargeRow.defaultProps = {
    label: 'Service Charge',
    key: 'serviceCharge',
    allowDeletion: true,
    defaultConfig: {
      percent: 0.12
    },
    configurable: true
}

export default setupReduxBindings(ServiceChargeRow);