import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BaseRow from './base_row';
import { updatePayment } from '../../../actions/expense_actions';
import { updateComputation, updateComputationForKey } from '../../../actions/computation_actions';

import './payment_row.css';

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
        const { payment } = props.expenseData.users[user];
        return payment ? payment : 0;
    }

    populate(props) {
        return _(this.getUsers(props))
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
        return _.keys(this.getUsers())
            .filter(this.props.determineShownUser)
            .map(user => {
                return !_.isUndefined(this.getUserPayment(user)) ? (
                    <td key={user} className="payment">
                        {this.renderPayment(user)}
                    </td>
                ):<td key={user}></td>;
            });
    }

    renderPayment(user) {
        return this.props.hasWriteAccess ? (<div className="input-group">
            <input type="number" pattern="[0-9]*" min="0" className="form-control" 
            value={this.getUserPayment(user)}
            onChange={event => this.updatePayment(user, event.target.value)} />
            </div>) : this.getUserPayment(user);
    }

    updatePayment(user, value) {
        this.props.updatePayment(user, Number(value));
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

export default connect(null, {
  updateComputation, updateComputationForKey,
  updatePayment
})(PaymentRow);