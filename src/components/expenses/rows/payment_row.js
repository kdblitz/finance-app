import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BaseRow from './base_row';
import { updateComputation, updateComputationForKey } from '../../../actions/computation_actions';

class PaymentRow extends BaseRow {
    constructor(props) {
        super(props);

        this.state = {
            total:0,
            users:{}
        };
    }
    componentWillMount() {
        this.compute();
    }

    componentWillReceiveProps(nextProps) {
        this.compute(nextProps);
    }

    compute(props = this.props) {
        const computations = {
            users: this.populate(props),
            total: 0
        };

        if (!_.isEqual(this.props.computations.payment, computations)) {
            const data = {
                key: this.props.key,
                computations
            };
            this.props.updateComputation(
                data
            );
        }
    }

    populate(props) {
        return _(props.users)
            .mapValues(user => {
                return this.state.users[user] || 0;
            }).value();
    }

    renderHeaderCells() {
        return <th colSpan={3}>Paid</th>;
    }

    renderSharingCell() {
        return <td></td>;
    }

    renderUserCells() {
        return _.keys(this.props.users).map(user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control" 
                            value={this.state.users[user]}
                            onChange={event => this.updatePayment(user, event.target.value)} />
                    </div>
                </td>
            );
        });
    }

    updatePayment(user, value) {
        const users = _.cloneDeep(this.state.users);
        users[user] = Number(value);
        this.setState({users});
        return this.props.updateComputationForKey({
            key: this.props.key,
            user,
            value: Number(value)
        });
    }
}

PaymentRow.defaultProps = {
    label: 'Paid',
    key: 'payment'
}

export default connect(null, {updateComputation, updateComputationForKey})(PaymentRow);