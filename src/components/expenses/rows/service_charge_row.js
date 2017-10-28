import React from 'react'
import ComputingRow, { setupReduxBindings } from './computing_row';

class ServiceChargeRow extends ComputingRow {
    constructor(props) {
        super(props);
    }

    computeUser(props, user, username) {
        const { subtotal } = props.computations;
        return (subtotal) ? subtotal.users[username] * this.state.config.percent : 0;
    }

    computeTotal(props) {
        const { subtotal } = props.computations;
        return (subtotal) ? subtotal.total * this.state.config.percent : 0;
    }

    renderConfig() {
      return (
        <div>
          <label htmlFor="percent">Percent</label>
          <input type="text" className="form-control" id="percent" 
            value={this.state.config.percent}
            onChange={event => this.updateConfig(event.target.value)}
          />
        </div>
      );
    }

    updateConfig(value) {
      this.setState({
        config: {percent: value}
      });
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