import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BaseRow from './base_row';
import { updateComputation, updateComputationForKey } from '../../../actions/computation_actions';

export const key = 'payment';

class PaymentRow extends BaseRow {
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
            this.props.updateComputation({
                key: this.props.key,
                computations
            });
        }
    }

    getUserPayment(user, props = this.props) {
        const { payment } = props.computations;
        return payment ? payment.users[user] : 0;
    }

    populate(props) {
        return _(props.users)
            .mapValues((claims,user)  => {
                return this.getUserPayment(user, props) || 0;
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
            return !_.isUndefined(this.getUserPayment(user)) ? (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control" 
                            value={this.getUserPayment(user)}
                            onChange={event => this.updatePayment(user, event.target.value)} />
                    </div>
                </td>
            ):<td key={user}></td>;
        });
    }

    updatePayment(user, value) {
        return this.props.updateComputationForKey({
            key: this.props.key,
            user,
            value: Number(value)
        });
    }
}

PaymentRow.defaultProps = {
    label: 'Paid',
    key
};

export default connect(null, {updateComputation, updateComputationForKey})(PaymentRow);