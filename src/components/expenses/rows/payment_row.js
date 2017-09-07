import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BaseRow from './base_row';
import { updatePayment } from '../../../actions/expense_actions';

class PaymentRow extends BaseRow {
    renderHeaderCells() {
        return <th colSpan={3}>Paid</th>;
    }

    renderSharingCell() {
        return <td></td>;
    }

    renderUserCells() {
        // const { name } = this.props.item;
        return _.keys(this.props.users).map(user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="number" pattern="[0-9]*" min="0" className="form-control" 
                            //value={this.props.users[user].claims[name]}
                            onChange={event => this.props.updatePayment(user, event.target.value)} />
                    </div>
                </td>
            );
        });
    }
}

export default connect(null, {updatePayment})(PaymentRow);